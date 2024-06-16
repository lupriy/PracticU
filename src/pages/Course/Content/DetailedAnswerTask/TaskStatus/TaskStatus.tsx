import { useMemo } from 'react';
import cn from 'classnames';

import {
  ACCEPTED_STATUS,
  IN_PROGRESS_STATUS,
  REJECTED_STATUS,
} from './constants';
import { TaskStatusProps } from './types';
import styles from './styles.module.scss';

export const TaskStatus = ({ status }: TaskStatusProps) => {
  const display = useMemo(() => {
    if (status === ACCEPTED_STATUS) {
      return (
        <div className={cn(styles['task-status'], styles.success, 'size-m')}>
          Задание принято
        </div>
      );
    } else if (status === IN_PROGRESS_STATUS) {
      return (
        <div className={cn(styles['task-status'], 'size-m')}>
          Задание отправлено на проверку
        </div>
      );
    } else if (status === REJECTED_STATUS) {
      return (
        <div className={cn(styles['task-status'], styles.error, 'size-m')}>
          Задание отклонено
        </div>
      );
    }

    return null;
  }, [status]);

  return <>{display}</>;
};
