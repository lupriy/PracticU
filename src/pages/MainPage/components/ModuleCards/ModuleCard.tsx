import { useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { CheckMark, Padlock } from 'shared/icons';
import { StyledLinearProgress } from 'shared/components/mui-styled/LinearProgress';
import {
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from 'shared/theme/mediaQuery';
import {
  MAX_PROGRESS_LINE_VALUE,
  MIN_PROGRESS_LINE_VALUE,
} from '../../constants';
import { ModuleCardProps } from './types';
import styles from './styles.module.scss';

const OPTIONS: Record<string, string> = {
  marketing: '#A651B4',
  programming: '#db5b73',
  design: '#2c77e7',
  analytics: '#cfd923',
  softskills: '#f8c456',
};

export const ModuleCard = ({
  number,
  title,
  description,
  isLocked = false,
  progress,
  className,
  tag,
  onClick,
}: ModuleCardProps & { tag: string }) => {
  const formatNumber = (number: number) =>
    number < 10 ? `0${number}` : number;

  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const setIcon = (color: string) => {
    switch (isLocked) {
      case true:
        return <Padlock />;

      case false:
        return <CheckMark color={color} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(styles.card, className, {
        [styles.clickable]: !isLocked,
        [styles['card-mobile']]: matchesMobile && !matchesTablet,
      })}
      onClick={onClick}
    >
      {matchesMobile && !matchesTablet && (
        <p className={cn(styles['number-mobile'], 'size-xs')}>
          Модуль {number}
        </p>
      )}
      <div className={styles.top}>
        <h3>{title}</h3>
        <div className={styles.icon}>{setIcon(OPTIONS[tag])}</div>
      </div>
      {matchesTablet && (
        <div className={styles.number}>{formatNumber(number)}</div>
      )}
      <p className={cn(styles.text, 'size-s')}>{description}</p>
      {progress && (
        <div className={styles.progress}>
          <p
            className={cn(styles['progress-text'], 'size-s')}
            style={{ color: OPTIONS[tag] }}
          >
            • Вы здесь
          </p>
          <div className={styles['progress-bar-wrapper']}>
            {[...new Array(progress.total)].map((_, index) => (
              <StyledLinearProgress
                key={index}
                value={
                  index + 1 <= progress.done
                    ? MAX_PROGRESS_LINE_VALUE
                    : MIN_PROGRESS_LINE_VALUE
                }
                variant='determinate'
                className={styles['progress-bar']}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
