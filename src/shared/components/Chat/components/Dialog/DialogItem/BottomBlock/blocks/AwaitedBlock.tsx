import React from 'react';
import cn from 'classnames';
import { AccessTimeFilled } from '@mui/icons-material';

import s from './styles.module.scss';

export const AwaitedBlock = () => (
  <div className={s.statusBlock}>
    <div className={s.icon}>
      <AccessTimeFilled sx={{ fontSize: 16, color: '#EB5D18' }} />
    </div>
    <div className={cn(s.text, s.text__awaited)}>Ожидает проверки</div>
  </div>
);
