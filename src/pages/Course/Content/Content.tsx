import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, useMediaQuery } from '@mui/material';
import cn from 'classnames';

import { CurrentLessonContent } from './CurrentLessonContent';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { unlockNextLesson, unlockNextModule } from 'redux/user/reducer';
import { userSelector, userGroupSelector } from 'redux/user/selectors';
import { Button } from 'shared/components/Button';
import { MEDIA_QUERY_TABLET } from 'shared/theme/mediaQuery';
import { COURSES_URL_PART } from 'shared/constants/paths';
import { Content as ContentType } from 'api/lesson-content/lessonContentType';
import { ContentProps } from './types';
import { STATUS_COMPLETED } from './constants';
import { api } from 'api';
import styles from './styles.module.scss';

export const Content = ({
  course,
  moduleId,
  lessonId: lessonKey,
}: ContentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { courseName } = useParams();

  const [content, setContent] = useState<ContentType>([]);
  const [isNextLessonAvailaible, setIsNextLessonAvailaible] = useState(false);
  const [isLastBookmarkClicked, setIsLastBookmarkClicked] = useState(false);
  const [bookmark, setBookmark] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);

  const user = useAppSelector(userSelector);
  const userGroup = useAppSelector(userGroupSelector);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);

  const lessonId = course.modules[moduleId - 1].lessons[lessonKey - 1].id;
  useEffect(() => {
    setIsLoading(true);
    const asyncEffect = async (id: number) => {
      try {
        const response = await api.lesson.lessonRetrieve(id, {
          group: userGroup,
        });
        const {
          data: { content, bookmark, next },
        } = response;
        const dataPars = JSON.parse(content);
        setContent(dataPars);
        setBookmark(bookmark || '');
        setIsNextLessonAvailaible(
          userGroup === 'student' ? next?.has_student_access : true
        );

        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    asyncEffect(lessonId);
  }, [lessonId, user?.groups, userGroup, refetch]);

  const isFirstLessonInCourse = lessonKey === 1 && moduleId === 1;
  const isLastLessonInCourse =
    moduleId === course.modules.length &&
    lessonKey === course.modules[course.modules.length - 1].lessons.length;

  const handleNavigateButton = (previous: boolean) => {
    const path = `/${COURSES_URL_PART}/${courseName}/module`;
    const isFirstLessonInModule = lessonKey === 1;
    const isLastLessonInModule =
      lessonKey === course.modules[moduleId - 1].lessons.length;

    if (previous) {
      const lastLessonNumberInPreviousModule =
        course.modules[moduleId - 2]?.lessons.length;

      navigate(
        `${path}-${moduleId + (isFirstLessonInModule ? -1 : 0)}/lesson-${
          isFirstLessonInModule
            ? lastLessonNumberInPreviousModule
            : lessonKey - 1
        }`
      );
      return;
    }

    navigate(
      `${path}-${moduleId + (isLastLessonInModule ? 1 : 0)}/lesson-${
        isLastLessonInModule ? 1 : lessonKey + 1
      }`
    );

    if (
      isLastLessonInModule &&
      moduleId === user?.active_course?.module.position
    ) {
      dispatch(unlockNextModule());
    } else {
      dispatch(unlockNextLesson(lessonKey));
    }
  };

  const isHasSeparator = useMemo(
    () => content.some(item => item.type === 'separator'),
    [content]
  );

  const isNotBlockSeparator = isHasSeparator
    ? bookmark === STATUS_COMPLETED
    : true;

  const isNotStudent = userGroup !== 'student';

  const isShowNextButton =
    !isLastLessonInCourse &&
    (isNotStudent ||
      ((isNextLessonAvailaible || isLastBookmarkClicked) &&
        isNotBlockSeparator));

  const pageContent = (
    <>
      <CurrentLessonContent
        content={content}
        matchesTablet={matchesTablet}
        lessonId={lessonId}
        bookmark={bookmark}
        setBookmark={setBookmark}
        setIsLastBookmarkClicked={setIsLastBookmarkClicked}
        setRefetch={setRefetch}
      />
      <div
        className={cn(styles.buttons, {
          [styles['buttons-centered']]:
            isFirstLessonInCourse || isLastLessonInCourse,
          [styles['buttons-mobile']]: !matchesTablet,
        })}
      >
        {!isFirstLessonInCourse && (
          <Button
            type='secondary'
            onClick={() => handleNavigateButton(true)}
            withTheme
            className={styles.back}
          >
            Предыдущий урок
          </Button>
        )}
        {isShowNextButton && (
          <Button
            onClick={() => handleNavigateButton(false)}
            withTheme
            className={styles.next}
            disabled={!isNextLessonAvailaible}
          >
            Следующий урок
          </Button>
        )}
      </div>
    </>
  );

  const visibleContent = isLoading ? (
    <CircularProgress size={80} className={styles.loader} />
  ) : (
    pageContent
  );

  return (
    <div className={styles.wrapper}>
      <p
        className={styles['lesson-info']}
      >{`Модуль ${moduleId}, урок ${lessonKey}`}</p>
      <h1 className={styles.header}>
        {course.modules[moduleId - 1].lessons[lessonKey - 1].name}
      </h1>
      {visibleContent}
    </div>
  );
};
