import React from 'react';
import cn from 'classnames';

import { TaskStatus } from '../../types';
import {
  STATUS_TASK_APPROVED,
  STATUS_TASK_REJACTED,
  STATUS_TASK_AWAITED,
} from '../../constants';
import s from './styles.module.scss';

type Props = {
  status: TaskStatus;
};

export const StatusLine = ({ status }: Props) => {
  const isApproved = status === STATUS_TASK_APPROVED;
  const isRejacted = status === STATUS_TASK_REJACTED;
  const isAwaited = status === STATUS_TASK_AWAITED;

  return (
    <div
      className={cn(s.line, {
        [s.line__approved]: isApproved,
        [s.line__rejacted]: isRejacted,
        [s.line__awaited]: isAwaited,
      })}
    ></div>
  );
};
