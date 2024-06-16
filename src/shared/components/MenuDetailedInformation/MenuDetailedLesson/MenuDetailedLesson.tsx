import React from 'react';
import { useNavigate } from 'react-router-dom';

import { COURSES_URL_PART } from '../../../../shared/constants/paths';
import {
  QUERY_COURSE_ID,
  QUERY_LESSON_ID,
} from '../../../../shared/constants/queries';
import { useGetQueryParameter } from '../../../../shared/hooks';
import styles from './MenuDetailedLesson.module.scss';

interface IProps {
  id: number;
  moduleId: number;
  name: string;
  position: number;
  handleCloseMenu: () => void;
}

export const MenuDetailedLesson = ({
  id,
  moduleId,
  name,
  position,
  handleCloseMenu,
}: IProps) => {
  const navigate = useNavigate();

  const idCourse = useGetQueryParameter({ query: QUERY_COURSE_ID });
  const idLesson = useGetQueryParameter({ query: QUERY_LESSON_ID });

  const isDestinationPoint = idLesson ? +idLesson === id : false;

  const handleSelectedLesson = () => {
    navigate(
      `/${COURSES_URL_PART}/all/modules/lessons/change?course-id=${idCourse}&module-id=${moduleId}&lesson-id=${id}`
    );
    handleCloseMenu();
  };

  return (
    <div className={styles.lesson} onClick={handleSelectedLesson}>
      <div className={styles.title}>
        {position}. {name}
      </div>

      {isDestinationPoint && (
        <div className={styles.point}>
          <div className={styles.circle}></div>
          <div className={styles.name}>Вы здесь</div>
        </div>
      )}
    </div>
  );
};
