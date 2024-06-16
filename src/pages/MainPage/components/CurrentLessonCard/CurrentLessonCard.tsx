import styles from './styles.module.scss';
import { CurrentLessonCardContent } from './CurrentLessonCardContent';
import { CurrentLessonCardProps } from './types';
import Skeleton from '@mui/material/Skeleton';

export const CurrentLessonCard = (props: CurrentLessonCardProps) => {
  const { title, module, lesson, children, courseName } = props;
  const isLoading = !(title && module && lesson && children && courseName);

  const visibleContent = isLoading ? (
    <Skeleton
      variant='rectangular'
      className={styles.wrapper}
      style={{ boxShadow: 'none', marginTop: '24px' }}
    />
  ) : (
    <CurrentLessonCardContent {...props} />
  );

  return <>{visibleContent}</>;
};
