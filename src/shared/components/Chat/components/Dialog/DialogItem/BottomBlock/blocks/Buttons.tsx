import React from 'react';
import { OpenInNew } from '@mui/icons-material';
import cn from 'classnames';

import { TaskInformation } from '../../types';
import { api } from '../../../../../../../../api';
import { COURSES_URL_PART } from '../../../../../../../constants/paths';
import s from './styles.module.scss';

const ID_BUTTON_RESOLVE = 'BUTTON_RESOLVE';
const ID_BUTTON_REJACT = 'BUTTON_REJACT';
const { taskResultAcceptCreate, taskResultDeclineCreate } = api.taskResult;

type Props = {
  id: number;
  taskInformation: TaskInformation;
};

export const Buttons = ({ id: taskId, taskInformation }: Props) => {
  const domain = window.location.origin;
  const { courseName, modulePosition, lessonPosition } = taskInformation;
  const urlLesson = `${domain}/${COURSES_URL_PART}/${courseName}/module-${modulePosition}/lesson-${lessonPosition}`;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async e => {
    const { id } = e.currentTarget;
    const isClickButtonResolve = id === ID_BUTTON_RESOLVE;
    const isClickButtonRejact = id === ID_BUTTON_REJACT;

    if (isClickButtonResolve) taskResultAcceptCreate(taskId);
    if (isClickButtonRejact) taskResultDeclineCreate(taskId);
  };

  return (
    <div>
      <a href={urlLesson} target='_blank' rel='noreferrer'>
        <div className={s.link}>
          <OpenInNew sx={{ fontSize: 16, color: '#EB5D18' }} />
          <div className={s.text}>Перейти к заданию</div>
        </div>
      </a>
      <div>
        <button
          className={cn(s.button, s.button__resolve)}
          id={ID_BUTTON_RESOLVE}
          onClick={handleClick}
        >
          Принять
        </button>
        <button
          className={cn(s.button, s.button__rejacte)}
          id={ID_BUTTON_REJACT}
          onClick={handleClick}
        >
          Отклонить
        </button>
      </div>
    </div>
  );
};
