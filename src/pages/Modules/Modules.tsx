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
import { api, ModuleNested, User } from '../../api';
import { Popup } from '../../shared/components';
import { useGetQueryParameter } from '../../shared/hooks';
import { QUERY_COURSE_ID } from '../../shared/constants/queries';

const MAX_WIDTH_MOBILE = 800;
const IS_MODULES = true;

const { courseRetrieve } = api.course;
const { moduleCreate, moduleUpdate, moduleDestroy } = api.module;

export interface IDataCourse {
  description: string;
  hours: number;
  id: number;
  mentor: null | User;
  mentors?: [];
  modules: ModuleNested[];
  name: string;
  price: number;
  tags: string[];
}

export const Modules = () => {
  const navigate = useNavigate();
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

  const [dataCourse, setDataCourse] = useState<IDataCourse | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState(0);
  const selectedModule = useMemo(
    () => dataCourse?.modules.find(item => item.id === selectedModuleId),
    [selectedModuleId, dataCourse]
  );

  const { width, ref } = useResizeDetector();
  const isMobile = useMemo(() => {
    if (width) {
      const resolve = width <= MAX_WIDTH_MOBILE;

      return resolve;
    }

    return false;
  }, [width]);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        if (idCourse) {
          const res = await courseRetrieve(+idCourse);
          const { data } = res;

          setDataCourse(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (isUpdate) {
      asyncEffect();
      setIsUpdate(false);
    }
  }, [idCourse, isUpdate]);

  const handleBackPage = () => {
    navigate(`/${COURSES_URL_PART}/all`);
  };

  const saveNewModule = async (name: string, description: string) => {
    try {
      if (idCourse && dataCourse) {
        const module = {
          course: +idCourse,
          name,
          description,
          position: dataCourse.modules.length + 1,
        };

        await moduleCreate(module);
        setIsUpdate(true);
        setIsOpenModalAdd(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeModule = async (name: string, description: string) => {
    try {
      if (selectedModule) {
        const changedModule = { ...selectedModule, name, description };

        await moduleUpdate(selectedModuleId, changedModule);
        setIsUpdate(true);
        setIsOpenModalChange(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteModule = async () => {
    try {
      await moduleDestroy(selectedModuleId);
      setIsUpdate(true);
      setIsOpenModalDelete(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getLessons = (moduleId: number) => {
    navigate(
      `/${COURSES_URL_PART}/all/modules/lessons?course-id=${idCourse}&module-id=${moduleId}`
    );
  };

  return (
    <div ref={ref}>
      <Navigation
        isModules={IS_MODULES}
        isMobile={isMobile}
        handleBackPage={handleBackPage}
      />

      <CardContainer
        isUserManager={isUserManager ?? false}
        isMobile={isMobile}
        isModules={IS_MODULES}
        title={dataCourse?.name || ''}
        tag={dataCourse?.tags[0] || ''}
        hours={dataCourse?.hours || 0}
        price={dataCourse?.price || 0}
        setIsOpenModalAdd={setIsOpenModalAdd}
        handleBackPage={handleBackPage}
      >
        {dataCourse?.modules.map(item => {
          const { id, name, description, position } = item;

          return (
            <CardContainerItem
              key={id}
              isUserManager={isUserManager ?? false}
              id={id}
              name={name}
              description={description}
              position={position}
              setSelectedItemId={setSelectedModuleId}
              setIsOpenModalChange={setIsOpenModalChange}
              setIsOpenModalDelete={setIsOpenModalDelete}
              getLessons={getLessons}
            />
          );
        })}
      </CardContainer>

      <Popup opened={isOpenModalAdd} setOpened={setIsOpenModalAdd}>
        {isOpenModalAdd && (
          <ModalAdd
            isModules={IS_MODULES}
            isMobile={isMobile}
            setIsOpenModalAdd={setIsOpenModalAdd}
            handleSave={saveNewModule}
          />
        )}
      </Popup>
      <Popup opened={isOpenModalChange} setOpened={setIsOpenModalChange}>
        {isOpenModalChange && (
          <ModalChange
            isModules={IS_MODULES}
            isMobile={isMobile}
            setIsOpenModalChange={setIsOpenModalChange}
            handleSave={changeModule}
            selectedItem={selectedModule ?? null}
          />
        )}
      </Popup>
      <Popup opened={isOpenModalDelete} setOpened={setIsOpenModalDelete}>
        {isOpenModalDelete && (
          <ModalDelete
            name={selectedModule?.name ?? ''}
            setIsOpenModalChange={setIsOpenModalDelete}
            deleteModule={deleteModule}
          />
        )}
      </Popup>
    </div>
  );
};
