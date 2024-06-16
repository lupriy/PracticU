import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLockBodyScroll } from 'react-use';

import { MenuDetailedModule } from './MenuDetailedModule';
import { MenuIcno, Label, Cross, Back } from './icons';
import { COURSES_URL_PART } from '../../../shared/constants/paths';
import { ModuleNested, User } from '../../../api';
import styles from './MenuDetailedInformation.module.scss';

export type TLessons = {
  id: number;
  module: number;
  name: string;
  description: string;
  position: number;
};

export type TModule = {
  course: number;
  description: string;
  id: number;
  lessons: TLessons[];
  name: string;
  position: number;
};

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

interface IProps {
  infoModule?: IDataCourse;
}

export const MenuDetailedInformation = ({ infoModule }: IProps) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const idCourse = new URLSearchParams(search).get('course-id');
  const idModule = new URLSearchParams(search).get('module-id');

  const [visibleMenu, setVisibleMenu] = useState(false);

  useLockBodyScroll(visibleMenu);

  const handleOpenMenu = () => setVisibleMenu(true);

  const handleCloseMenu = () => setVisibleMenu(false);

  const handleStopPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => e.stopPropagation();

  const handleBack = () => {
    navigate(
      `/${COURSES_URL_PART}/all/modules/lessons?course-id=${idCourse}&module-id=${idModule}`
    );
  };

  const handleRedirectMain = () => {
    navigate(`/`);
  };

  return (
    <>
      <button className={styles.button} onClick={handleOpenMenu}>
        <MenuIcno />
      </button>

      <button className={styles.buttonBack} onClick={handleBack}>
        <Back />
        <span>Назад</span>
      </button>

      {visibleMenu && infoModule && (
        <div className={styles.background} onClick={handleCloseMenu}>
          <div className={styles.menu} onClick={handleStopPropagation}>
            <div className={styles.header}>
              <button onClick={handleRedirectMain}>
                <Label />
              </button>

              <button onClick={handleCloseMenu}>
                <Cross />
              </button>
            </div>

            <div className={styles.title}>{infoModule.name}</div>
            {infoModule.modules.map(item => {
              const { id, name, lessons, position } = item;

              return (
                <MenuDetailedModule
                  key={id}
                  moduleId={id}
                  title={name}
                  position={position}
                  lessons={lessons}
                  lessonsCount={lessons.length}
                  handleCloseMenu={handleCloseMenu}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
