import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Skeleton, ThemeProvider, useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserThunk } from '../../redux/user/thunks';
import { userGroupSelector, userSelector } from '../../redux/user/selectors';
import { getCourseThunk } from '../../redux/course/thunks';
import { getUserCoursesThunk } from '../../redux/userCourses/thunks';
import { userCoursesSelector } from '../../redux/userCourses/selectors';
import { courseProgressSelector } from 'redux/courseProgress/selectors';
import { getCourseProgress } from 'redux/courseProgress/thunk';
import {
  courseModulesSelector,
  courseTagSelector,
} from '../../redux/course/selectors';
import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../shared/theme/mediaQuery';
import { MAIN_URL_PART } from '../../shared/constants/paths';
import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../shared/constants/constants';
import { setTheme } from '../../shared/utils/setTheme';
import { Navigation } from '../../shared/components/Navigation';
import {
  CourseProgressBar,
  CurrentLessonCard,
  ModuleCards,
} from './components';

import styles from './styles.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const courses = useAppSelector(userCoursesSelector);
  const courseTag = useAppSelector(courseTagSelector);
  const activeCourseModules = useAppSelector(courseModulesSelector);
  const user = useAppSelector(userSelector);

  const userGroup = useAppSelector(userGroupSelector);
  const activeStudentCourse =
    useAppSelector(courseProgressSelector) || user?.active_course;

  const [isFirstRender, setIsFirstRender] = useState(true);

  const courseId = activeStudentCourse?.course.id;

  useEffect(() => {
    if (!courses && userGroup) {
      dispatch(getUserCoursesThunk(userGroup));
    }
    if (courseId) {
      dispatch(getCourseThunk(courseId, userGroup));
    }
  }, [courses, userGroup, courseId, dispatch]);

  useEffect(() => {
    if (isFirstRender && courseId) {
      dispatch(getCourseProgress(courseId));
      setIsFirstRender(false);
    }
  }, [isFirstRender, courseId, dispatch]);

  useEffect(() => {
    if (userGroup === ID_ROLE_MENTOR && pathname === `/${MAIN_URL_PART}`) {
      //navigate(`${MY_STUDENTS_URL_PART}`);
    }
  }, [userGroup, pathname, navigate]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  }, [dispatch, user]);

  const PAGE_CONTAINER_STYLES = cn(
    { [styles['page-container']]: matchesDesktop },
    {
      [styles['page-container-tablet']]: matchesTablet && !matchesDesktop,
    },
    {
      [styles['page-container-mobile']]: matchesMobile && !matchesTablet,
    }
  );

  //TODO: сделать нормальные главные экраны для всех ролей и переделать с userGroup
  return (
    <ThemeProvider theme={setTheme(courseTag)}>
      <Navigation />

      {userGroup === ID_ROLE_STUDENT && (
        <div className={PAGE_CONTAINER_STYLES}>
          <p className={'size-s'}>Вы проходите курс</p>

          <h1 className={styles['course-header']}>
            {activeStudentCourse?.course.name ? (
              activeStudentCourse?.course.name
            ) : (
              <Skeleton width='90%' />
            )}
          </h1>

          <div className={styles['progress-container']}>
            <CourseProgressBar className={styles.progress} />
          </div>

          <p className={cn(styles['progress-description'], 'size-s')}>
            {activeStudentCourse && activeCourseModules ? (
              `Модуль ${activeStudentCourse?.module.position} из ${activeCourseModules?.length} «${activeStudentCourse?.module.name}»`
            ) : (
              <Skeleton width='40%' />
            )}
          </p>

          <h1 className={styles.header}>Ваш урок</h1>

          <CurrentLessonCard
            courseName={activeStudentCourse?.course.name}
            module={activeStudentCourse?.module.position}
            lesson={activeStudentCourse?.lesson.position}
            title={activeStudentCourse?.lesson.name}
            className={cn(styles['current-lesson'], {
              [styles['current-lesson-mobile']]: !matchesTablet,
            })}
          >
            <p className={cn(styles['current-lesson-text'], 'size-s')}>
              {activeStudentCourse?.lesson.description}
            </p>
          </CurrentLessonCard>

          <h1 className={styles.header}>Все модули курса</h1>

          <div className={styles['modules-container']}>
            <ModuleCards
              className={cn(styles.moduleCard, {
                [styles['moduleCard-mobile']]: matchesMobile && !matchesTablet,
              })}
            />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};
