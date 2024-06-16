import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResizeDetector } from 'react-resize-detector';

import { useAppSelector } from '../../redux/hooks';
import { userSelector } from '../../redux/user/selectors';
import { COURSES_URL_PART } from '../../shared/constants/paths';
import { Navigation } from '../../shared/components/Navigation';
import {
  CardContainer,
  ModalAdd,
  ModalChange,
  CardContainerItem,
  ModalDelete,
} from '../../shared/components/CardContainer';
import { api } from '../../api';
import { Popup } from '../../shared/components';
import {
  QUERY_MODULE_ID,
  QUERY_COURSE_ID,
} from '../../shared/constants/queries';
import { useGetQueryParameter } from '../../shared/hooks';

const MAX_WIDTH_MOBILE = 800;
const IS_LESSON = true;

type TLessons = {
  id: number;
  module: number;
  name: string;
  description: string;
  position: number;
};

interface IModule {
  course: number;
  description: string;
  id: number;
  lessons: TLessons[];
  name: string;
  position: number;
}

export const Lessons = () => {
  const navigate = useNavigate();

  const idModule = useGetQueryParameter({ query: QUERY_MODULE_ID });
  const idCourse = useGetQueryParameter({ query: QUERY_COURSE_ID });

  const user = useAppSelector(userSelector);
  const isUserManager = useMemo(
    () => user && user.groups.some(item => item === 'manager'),
    [user]
  );

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalChange, setIsOpenModalChange] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isUpdate, setIsUpdate] = useState(true);

  const [dataModule, setDataModule] = useState<IModule | null>(null);
  const [titleCourse, setTitleCourse] = useState('');

  const [selectedLessonId, setSelectedLessonId] = useState(0);
  const selectedLesson = useMemo(
    () => dataModule?.lessons.find(item => item.id === selectedLessonId),
    [selectedLessonId, dataModule]
  );

  const { width, ref } = useResizeDetector();
  const isMobile = useMemo(() => {
    if (width) {
      const isMobile = width <= MAX_WIDTH_MOBILE;
      return isMobile;
    }

    return false;
  }, [width]);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        if (idCourse && idModule) {
          const resCourse = await api.course.courseRetrieve(+idCourse);
          const resModule = await api.module.moduleRetrieve(+idModule);

          const { data: dataCourse } = resCourse;
          const { data: dataModule } = resModule;

          setDataModule(dataModule);
          setTitleCourse(dataCourse.name);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (isUpdate) {
      asyncEffect();
      setIsUpdate(false);
    }
  }, [idModule, isUpdate, idCourse]);

  const handleBackPage = () => {
    navigate(`/${COURSES_URL_PART}/all/modules?course-id=${idCourse}`);
  };

  const saveNewLesson = async (name: string, description: string) => {
    try {
      if (dataModule && idModule) {
        const module = {
          module: +idModule,
          name,
          description,
          position: dataModule.lessons.length + 1,
        };

        await api.lesson.lessonCreate(module);
        setIsUpdate(true);
        setIsOpenModalAdd(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeLesson = async (name: string, description: string) => {
    try {
      if (selectedLesson) {
        const changedLesson = { ...selectedLesson, name, description };

        await api.lesson.lessonUpdate(selectedLessonId, changedLesson);
        setIsUpdate(true);
        setIsOpenModalChange(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLesson = async () => {
    try {
      await api.lesson.lessonDestroy(selectedLessonId);
      setIsUpdate(true);
      setIsOpenModalDelete(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getLessonsChange = (lessonId: number) => {
    navigate(
      `/${COURSES_URL_PART}/all/modules/lessons/change?course-id=${idCourse}&module-id=${idModule}&lesson-id=${lessonId}`
    );
  };

  return (
    <div ref={ref}>
      <Navigation
        isLesson={IS_LESSON}
        isMobile={isMobile}
        moduleTitle={titleCourse}
        handleBackPage={handleBackPage}
      />

      <CardContainer
        isUserManager={isUserManager ?? false}
        isMobile={isMobile}
        title={dataModule?.name || ''}
        numberModule={dataModule?.position}
        countLesson={dataModule?.lessons.length}
        setIsOpenModalAdd={setIsOpenModalAdd}
        handleBackPage={handleBackPage}
      >
        {dataModule?.lessons.map(item => {
          const { id, name, description, position } = item;

          return (
            <CardContainerItem
              key={id}
              isUserManager={isUserManager ?? false}
              id={id}
              name={name}
              description={description}
              position={position}
              isLesson={true}
              setSelectedItemId={setSelectedLessonId}
              setIsOpenModalChange={setIsOpenModalChange}
              setIsOpenModalDelete={setIsOpenModalDelete}
              getLessons={getLessonsChange}
            />
          );
        })}
      </CardContainer>

      <Popup opened={isOpenModalAdd} setOpened={setIsOpenModalAdd}>
        {isOpenModalAdd && (
          <ModalAdd
            isMobile={isMobile}
            setIsOpenModalAdd={setIsOpenModalAdd}
            handleSave={saveNewLesson}
          />
        )}
      </Popup>
      <Popup opened={isOpenModalChange} setOpened={setIsOpenModalChange}>
        {isOpenModalChange && selectedLesson && (
          <ModalChange
            isMobile={isMobile}
            setIsOpenModalChange={setIsOpenModalChange}
            handleSave={changeLesson}
            selectedItem={selectedLesson}
          />
        )}
      </Popup>
      <Popup opened={isOpenModalDelete} setOpened={setIsOpenModalDelete}>
        {isOpenModalDelete && (
          <ModalDelete
            name={selectedLesson?.name ?? ''}
            setIsOpenModalChange={setIsOpenModalDelete}
            deleteModule={deleteLesson}
          />
        )}
      </Popup>
    </div>
  );
};
