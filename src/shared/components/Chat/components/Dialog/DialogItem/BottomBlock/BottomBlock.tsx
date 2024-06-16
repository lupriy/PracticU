import React, { useMemo } from 'react';

import cn from 'classnames';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../../redux/user/selectors';
import { ID_ROLE_MENTOR } from '../../../../../../constants/constants';
import { TaskStatus } from '../../types';
import { ApproveBlock, RejacteBlock, AwaitedBlock, Buttons } from './blocks';
import {
  STATUS_TASK_APPROVED,
  STATUS_TASK_REJACTED,
  STATUS_TASK_AWAITED,
} from '../../constants';
import { TaskInformation } from '../types';
import s from './styles.module.scss';

type Props = {
  status: TaskStatus;
  id: number;
  isRight: boolean;
  taskInformation: TaskInformation;
};

export const BottomBlock = ({
  status,
  id,
  isRight,
  taskInformation,
}: Props) => {
  const userGroup = useAppSelector(userGroupSelector);

  const isMentor = userGroup === ID_ROLE_MENTOR;
  const isApproved = status === STATUS_TASK_APPROVED;
  const isRejacted = status === STATUS_TASK_REJACTED;
  const isAwaited = status === STATUS_TASK_AWAITED;

  const displayBlock = useMemo(() => {
    if (isApproved) {
      return <ApproveBlock />;
    } else if (isRejacted) {
      return <RejacteBlock />;
    } else if (isAwaited && !isMentor) {
      return <AwaitedBlock />;
    } else if (isAwaited && isMentor) {
      return <Buttons id={id} taskInformation={taskInformation} />;
    }
  }, [isApproved, isRejacted, isAwaited, isMentor, id, taskInformation]);

  return (
    <div className={cn(s.block, { [s.block__right]: isRight })}>
      {displayBlock}
    </div>
  );
};
