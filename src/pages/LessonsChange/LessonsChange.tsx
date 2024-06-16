import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { LessonsChangeContent } from './LessonsChangeContent';
import { IDataCourse } from '../Modules/Modules';
import { Navigation } from '../../shared/components/Navigation';
import { api, LessonFull } from '../../api';
import { Content as TContent } from '../../api/lesson-content/lessonContentType';
import { TDataChange } from './LessonsChangeContent/types';
import { useFormatDataForSave } from './hooks';
import { StatusBlock } from './Status';
import { ID_RESPONSE_ERROR, ID_RESPONSE_APPROVE, MANAGER } from './constans';
import { useAppSelector } from '../../redux/hooks';
import { userGroupSelector } from '../../redux/user/selectors';
import { useGetQueryParameter } from '../../shared/hooks';
import {
  QUERY_COURSE_ID,
  QUERY_LESSON_ID,
} from '../../shared/constants/queries';

import styles from './LessonsChange.module.scss';

export const LessonsChange = () => {
  const navigate = useNavigate();
  const userGroup = useAppSelector(userGroupSelector);
  if (userGroup !== MANAGER) {
    navigate('/'); // если пользователь не менеджер, редирект на главую
  }

  const idLesson = useGetQueryParameter({ query: QUERY_LESSON_ID });
  const idCourse = useGetQueryParameter({ query: QUERY_COURSE_ID });

  const [dataCourse, setDataCourse] = useState<IDataCourse | null>(null);
  const [dataContent, setDataContent] = useState<TContent | null>(null);
  const [dataLesson, setDataLesson] = useState<LessonFull | null>(null);
  const [dataChange, setDataChange] = useState<TDataChange>({});
  const [aheadValue, setAheadValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [statusResponse, setStatusResponse] = useState('');

  const { formatDataSave } = useFormatDataForSave();

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        if (idCourse) {
          const res = await api.course.courseRetrieve(+idCourse);
          const { data } = res;

          setDataCourse(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [idCourse]);

  useEffect(() => {
    setIsLoading(true);
    const asyncEffect = async () => {
      try {
        if (idLesson) {
          const res = await api.lesson.lessonRetrieve(+idLesson, {
            with_answers: true,
          });
          const { data } = res;
          const dataContentPars = JSON.parse(data.content);

          setDataLesson(data);
          setDataContent(dataContentPars);
          setAheadValue(data.ahead);
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    asyncEffect();
  }, [idLesson]);

  const handleUpdate = async () => {
    try {
      if (dataLesson) {
        const data = formatDataSave({ data: dataChange });

        const ishasImportantTask = data.some(
          elem => elem?.type === 'project_task' && elem?.isDoneRequired
        );

        const dataJson = JSON.stringify(data);

        const obj = {
          ...dataLesson,
          description: dataLesson.description,
          content: dataJson,
          ahead: ishasImportantTask ? aheadValue : null,
        };

        await api.lesson.lessonPartialUpdate(dataLesson.id, obj);
        setStatusResponse(ID_RESPONSE_APPROVE);
      }
    } catch (e) {
      setStatusResponse(ID_RESPONSE_ERROR);
      console.error(e);
    }
  };

  const isVisibleLessonsChangeContent = dataCourse && dataContent && !isLoading;

  const visibleContent = isVisibleLessonsChangeContent ? (
    <div className={styles.content}>
      <LessonsChangeContent
        dataCourse={dataCourse}
        dataContent={dataContent}
        dataChange={dataChange}
        aheadValue={aheadValue}
        setAheadValue={setAheadValue}
        setDataChange={setDataChange}
      />
    </div>
  ) : (
    <CircularProgress size={80} className={styles.loader} />
  );

  return (
    <div>
      <Navigation
        isNotVisibleLeftSideBar={true}
        isVisibleMenuDetailedInformation={true}
        infoModule={dataCourse}
      />

      <div className={styles.buttonBlock}>
        <button onClick={handleUpdate}>Опубликовать</button>
      </div>

      {statusResponse && (
        <StatusBlock status={statusResponse} setStatus={setStatusResponse} />
      )}

      {visibleContent}
    </div>
  );
};
