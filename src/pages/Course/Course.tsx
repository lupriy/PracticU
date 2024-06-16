import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, ThemeProvider } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userCoursesSelector } from '../../redux/userCourses/selectors';
import { getUserCoursesThunk } from '../../redux/userCourses/thunks';
import { getCourseThunk } from '../../redux/course/thunks';
import {
  courseTagSelector,
  courseSelector,
} from '../../redux/course/selectors';
import { userGroupSelector, userSelector } from '../../redux/user/selectors';
import { getUserThunk } from '../../redux/user/thunks';
import { setTheme } from '../../shared/utils/setTheme';
import { Content } from './Content';
import { CourseHeader } from './CourseHeader';
import styles from './styles.module.scss';

export const Course = () => {
  const { moduleId, lessonId, courseName } = useParams();
  const dispatch = useAppDispatch();

  const courseList = useAppSelector(userCoursesSelector);
  const course = useAppSelector(courseSelector);
  const courseTag = useAppSelector(courseTagSelector);
  const user = useAppSelector(userSelector);
  const userGroup = useAppSelector(userGroupSelector);

  const isContentLoaded = lessonId && moduleId && course;

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
      return;
    }

    if (!courseList && userGroup) {
      dispatch(getUserCoursesThunk(userGroup));
      return;
    }

    if (courseList) {
      const courseId = courseList.results?.find(
        result => result.name === courseName
      )?.id;

      courseId && dispatch(getCourseThunk(courseId, userGroup));
    }
  }, [user, userGroup, courseList, courseName, dispatch]);

  return (
    <ThemeProvider theme={setTheme(courseTag)}>
      {course && <CourseHeader menuContent={course} />}
      {isContentLoaded ? (
        <Content course={course} lessonId={+lessonId} moduleId={+moduleId} />
      ) : (
        <CircularProgress size={80} className={styles.loader} />
      )}
    </ThemeProvider>
  );
};
