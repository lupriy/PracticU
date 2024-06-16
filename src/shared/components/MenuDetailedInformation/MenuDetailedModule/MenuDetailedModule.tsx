import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Down, Up } from '../icons';
import { TLessons } from '../MenuDetailedInformation';
import { MenuDetailedLesson } from '../MenuDetailedLesson';
import styles from './MenuDetailedModule.module.scss';

interface IProps {
  moduleId: number;
  title: string;
  position: number;
  lessons: TLessons[];
  lessonsCount: number;
  handleCloseMenu: () => void;
}

export const MenuDetailedModule = ({
  moduleId,
  title,
  position,
  lessonsCount,
  lessons,
  handleCloseMenu,
}: IProps) => {
  const search = useLocation().search;
  const idLesson = new URLSearchParams(search).get('lesson-id');

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (idLesson) {
      const isHaveActiveItem = lessons.some(item => item.id === +idLesson);

      if (isHaveActiveItem) setIsOpen(true);
    }
  }, [idLesson, lessons]);

  const toggleOpen = () => setIsOpen(state => !state);

  return (
    <>
      <div className={styles.module} onClick={toggleOpen}>
        <div className={styles.title}>
          {position}. {title}
        </div>
        <div className={styles.info}>
          <div className={styles.lessonsCount}>{lessonsCount}</div>
          {isOpen ? <Up /> : <Down />}
        </div>
      </div>

      {isOpen && (
        <div className={styles.list}>
          {lessons.map(item => {
            const { id, name, position } = item;

            return (
              <MenuDetailedLesson
                key={id}
                id={id}
                moduleId={moduleId}
                name={name}
                position={position}
                handleCloseMenu={handleCloseMenu}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
