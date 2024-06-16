import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { CurrentLessonCardProps } from './types';
import { Button } from '../../../../shared/components/Button';
import { MEDIA_QUERY_TABLET } from '../../../../shared/theme/mediaQuery';
import { COURSES_URL_PART } from '../../../../shared/constants/paths';
import styles from './styles.module.scss';

export const CurrentLessonCardContent = ({
  module,
  lesson,
  courseName,
  title,
  children,
  className,
}: CurrentLessonCardProps) => {
  const navigate = useNavigate();
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);

  const theme = useTheme();

  // TODO: Вынести handleClick в проп
  const handleClick = () => {
    navigate(
      `${COURSES_URL_PART}/${courseName}/module-${module}/lesson-${lesson}`
    );
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <p
        className={cn(styles['lesson-info'], 'size-s')}
      >{`Модуль ${module}, урок ${lesson}`}</p>
      <h2>{title}</h2>
      {children}
      {/* TODO: Заменить цвет кнопки на тему */}
      <Button withTheme className={styles.button} onClick={handleClick}>
        Продолжить учиться
      </Button>
      {matchesTablet && theme.courseImages?.secondary(styles.background)}
    </div>
  );
};
