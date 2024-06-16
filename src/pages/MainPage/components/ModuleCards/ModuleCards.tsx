import {
  activeModuleLengthSelector,
  courseModulesSelector,
} from 'redux/course/selectors';
import { courseProgressSelector } from 'redux/courseProgress/selectors';
import { useAppSelector } from 'redux/hooks';
import { userSelector } from 'redux/user/selectors';
import { ModuleCard } from './ModuleCard';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COURSES_URL_PART } from 'shared/constants/paths';

const isModuleLocked = (
  currentModulePosition: number,
  activeCourseModulePosition: number
) => {
  if (currentModulePosition === activeCourseModulePosition) {
    return null;
  }

  return currentModulePosition > activeCourseModulePosition ? true : false;
};

type TProps = {
  className: string;
};

export const ModuleCards = ({ className }: TProps) => {
  const navigate = useNavigate();

  const activeCourseModules = useAppSelector(courseModulesSelector);
  const user = useAppSelector(userSelector);
  const activeStudentCourse =
    useAppSelector(courseProgressSelector) || user?.active_course;
  const activeModuleLength = useAppSelector(state =>
    activeModuleLengthSelector(state, activeStudentCourse?.module.id)
  );

  const handleModuleCardClick = (moduleNumber: number, courseName?: string) => {
    const isSuccess = !(
      courseName &&
      activeStudentCourse &&
      moduleNumber > activeStudentCourse.module.position
    );
    const moduleUrl = `${COURSES_URL_PART}/${courseName}/module-${moduleNumber}/lesson-1`;

    if (isSuccess) {
      navigate(moduleUrl);
    }
  };

  const isLoading = !activeCourseModules;

  const skeleton = [1, 2, 3].map(el => (
    <Skeleton variant='rectangular' className={className} key={el} />
  ));

  const content = activeCourseModules?.map((module, index) => {
    const { description, name } = module;

    if (activeStudentCourse) {
      const {
        course: { tags },
        module: { position: modulePosition },
        lesson: { position: lessonPosition },
      } = activeStudentCourse;

      const number = index + 1;
      const isLocked = isModuleLocked(number, modulePosition);
      const progress =
        activeModuleLength && number === modulePosition
          ? {
              total: activeModuleLength,
              done: lessonPosition,
            }
          : null;
      const handleClick = () => handleModuleCardClick(number, name);

      return (
        <ModuleCard
          key={module.id}
          number={number}
          tag={tags[0]}
          title={name}
          description={description}
          isLocked={isLocked}
          progress={progress}
          onClick={handleClick}
        />
      );
    }
    return null;
  });

  const displayContent = isLoading ? skeleton : content;

  return <>{displayContent}</>;
};
