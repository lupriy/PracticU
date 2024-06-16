import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useMediaQuery } from '@mui/material';
import { ModuleNested } from '../../../../api';
import { useAppSelector } from '../../../../redux/hooks';
import {
  userGroupSelector,
  userSelector,
} from '../../../../redux/user/selectors';
import {
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../../../shared/theme/mediaQuery';
import { courseProgressSelector } from 'redux/courseProgress/selectors';
import { useFocus } from '../../../../shared/hooks';
import { ReactComponent as LogoIcon } from '../../../../shared/icons/logo.svg';
import { ListEdge } from '../../../../shared/components/ListEdge';
import { COURSES_URL_PART } from '../../../../shared/constants/paths';
import { ReactComponent as CloseIcon } from './images/close.svg';
import { ReactComponent as ArrowDownIcon } from './images/arrow-down.svg';
import { Props } from './types';
import styles from './styles.module.scss';

export const Menu = ({ content, handleClose }: Props) => {
  const initialShownArray = new Array<boolean>(content.modules.length).fill(
    false
  );
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const userGroup = useAppSelector(userGroupSelector);
  const activeStudentCourse =
    useAppSelector(courseProgressSelector) || user?.active_course;
  const [shown, setShown] = useState(initialShownArray);
  const {
    moduleId: moduleNumber,
    lessonId: lessonNumber,
    courseName,
  } = useParams();

  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const userActiveModulePosition = activeStudentCourse?.module.position ?? 0;
  const userActiveLessonPosition = activeStudentCourse?.lesson.position ?? 0;

  const handleMenuModule = (number: number) => {
    const newMenuItemsArray = [...shown];
    newMenuItemsArray[number] = !shown[number];
    setShown(newMenuItemsArray);
  };

  const handleMenuLesson = (
    moduleIndex: number,
    lessonIndex: number,
    courseName: string
  ) => {
    if (!isLessonClosed(moduleIndex, lessonIndex)) {
      navigate(
        `/${COURSES_URL_PART}/${courseName}/module-${moduleIndex + 1}/lesson-${
          lessonIndex + 1
        }`
      );
      handleClose();
    }
  };

  const [focusRef, setFocus] = useFocus();

  useEffect(() => {
    if (typeof setFocus === 'function') {
      setFocus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isLessonClosed = (moduleIndex: number, lessonIndex: number) => {
    if (userGroup === 'student') {
      const moduleNumber = moduleIndex + 1;

      if (moduleNumber > userActiveModulePosition) {
        return true;
      } else if (moduleNumber < userActiveModulePosition) {
        return false;
      } else if (moduleNumber === userActiveModulePosition) {
        return lessonIndex + 1 > userActiveLessonPosition;
      }
    }
  };

  const calcLessonsDoneInModule = (module: ModuleNested) => {
    const modulePosition = module.position;
    const lessonsLength = module.lessons.length;

    if (userGroup === 'student') {
      if (modulePosition < userActiveModulePosition) {
        return lessonsLength;
      } else if (modulePosition === userActiveModulePosition) {
        return userActiveLessonPosition;
      } else {
        return 0;
      }
    } else {
      return lessonsLength;
    }
  };

  return (
    user && (
      <aside
        className={cn(styles.menu, {
          [styles['menu-mobile']]: matchesMobile && !matchesTablet,
        })}
        tabIndex={-1}
        onBlur={handleClose}
        ref={focusRef}
      >
        <CloseIcon className={styles.close} onClick={handleClose} />
        <LogoIcon className={styles.logo} onClick={() => navigate('/')} />
        <h2 className={styles.title}>{content.name}</h2>
        <ul className={styles.list}>
          {content.modules.map((trainingModule, moduleIndex) => (
            <li className={styles['module-item']} key={moduleIndex}>
              <div
                className={styles['module-row']}
                onClick={() => handleMenuModule(moduleIndex)}
              >
                <p className={styles['module-name']}>
                  {moduleIndex + 1}. {trainingModule.name}
                </p>
                <div className={styles['module-lessons-total']}>
                  <p
                    className={cn(
                      'size-xs',
                      styles['module-lessons-total-count']
                    )}
                  >
                    {`${calcLessonsDoneInModule(trainingModule)}
                    /
                    ${trainingModule.lessons.length}`}
                  </p>
                  <ArrowDownIcon
                    className={cn({
                      [styles.rotated]: shown[moduleIndex],
                    })}
                  />
                </div>
              </div>
              {shown[moduleIndex] && (
                <ol className={styles['lessons-list']}>
                  {trainingModule.lessons.map((lesson, lessonIndex) => (
                    <li
                      className={cn(styles['lesson-name'], {
                        [styles.closed]: isLessonClosed(
                          moduleIndex,
                          lessonIndex
                        ),
                      })}
                      key={lessonIndex}
                      onClick={() =>
                        handleMenuLesson(
                          moduleIndex,
                          lessonIndex,
                          `${courseName}`
                        )
                      }
                    >
                      {`${lessonIndex + 1}. ${lesson.name}`}
                      {moduleNumber &&
                        lessonNumber &&
                        +moduleNumber === moduleIndex + 1 &&
                        +lessonNumber === lessonIndex + 1 && (
                          <>
                            <ListEdge className={styles.edge} />
                            <p className={cn(styles.pointer, 'size-s')}>
                              • Вы здесь
                            </p>
                          </>
                        )}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ul>
      </aside>
    )
  );
};
