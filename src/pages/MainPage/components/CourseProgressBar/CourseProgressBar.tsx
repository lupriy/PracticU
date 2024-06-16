import { Skeleton } from '@mui/material';
import { courseModulesSelector } from 'redux/course/selectors';
import { useAppSelector } from 'redux/hooks';
import { StyledLinearProgress } from 'shared/components/mui-styled/LinearProgress';
import {
  MAX_PROGRESS_LINE_VALUE,
  MIN_PROGRESS_LINE_VALUE,
} from '../../constants';
import { userSelector } from 'redux/user/selectors';
import { courseProgressSelector } from 'redux/courseProgress/selectors';

type TProps = {
  className: string;
};

export const CourseProgressBar = ({ className }: TProps) => {
  const activeCourseModules = useAppSelector(courseModulesSelector);
  const user = useAppSelector(userSelector);
  const activeStudentCourse =
    useAppSelector(courseProgressSelector) || user?.active_course;

  const skeleton = <Skeleton width='100%' />;
  const content = activeCourseModules?.map((module, index) => {
    let value = MAX_PROGRESS_LINE_VALUE;
    if (activeStudentCourse) {
      const {
        module: { position: modulePosition },
        lesson: { position: lessonPosition },
      } = activeStudentCourse;

      const isActiveModule =
        activeStudentCourse && index === modulePosition - 1;
      const isFutureModule = activeStudentCourse && index > modulePosition - 1;

      if (isFutureModule) {
        value = MIN_PROGRESS_LINE_VALUE;
      }

      if (isActiveModule) {
        value = (value / module.lessons.length) * lessonPosition;
      }

      value = Math.min(value, MAX_PROGRESS_LINE_VALUE);

      return (
        <StyledLinearProgress
          key={index}
          value={value}
          className={className}
          variant='determinate'
        />
      );
    }

    return null;
  });

  const displayContent = !activeCourseModules ? skeleton : content;

  return <>{displayContent}</>;
};
