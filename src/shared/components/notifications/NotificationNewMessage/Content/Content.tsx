import React, { useCallback, useEffect } from 'react';
import { Close } from '@mui/icons-material';

import { formatTime } from '../../../../utils';
import { MessageInfo, StateMessageInfo } from '../types';
import s from './styles.module.scss';

const TIME = 5000;

type Props = MessageInfo & {
  setMessageInfo: React.Dispatch<React.SetStateAction<StateMessageInfo>>;
};

export const Content = ({
  avatar,
  text,
  name,
  date,
  setMessageInfo,
}: Props) => {
  const { time } = formatTime({ date });

  const handleClose = useCallback(() => {
    setMessageInfo(null);
  }, [setMessageInfo]);

  useEffect(() => {
    const id = setTimeout(handleClose, TIME);

    return () => {
      clearTimeout(id);
    };
  }, [handleClose]);

  return (
    <div className={s.block}>
      <div className={s.container}>
        <button className={s.button} onClick={handleClose}>
          <Close sx={{ fontSize: 16, color: '#D9D9D9' }} />
        </button>
        <div className={s.avatarBlock}>
          <div className={s.avatar}></div>
        </div>
        <div>
          <div className={s.name}>{name}</div>
          <div className={s.text}>{text}</div>
        </div>
        <div className={s.time}>{time}</div>
      </div>
    </div>
  );
};
