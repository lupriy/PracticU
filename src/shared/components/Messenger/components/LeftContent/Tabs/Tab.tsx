import React from 'react';
import cn from 'classnames';

import { TypeMessenger } from '../types';
import s from './styles.module.scss';

type TProps = {
  id: TypeMessenger;
  lable: string;
  isActive: boolean;
  setTabSelect: React.Dispatch<React.SetStateAction<TypeMessenger>>;
};

export const Tab = ({ id, lable, isActive, setTabSelect }: TProps) => {
  const handleToggleTab: React.MouseEventHandler<HTMLDivElement> = e => {
    const { id } = e.currentTarget;
    setTabSelect(id as TypeMessenger);
  };

  return (
    <div className={s.tab}>
      <div
        className={cn(s.lable, { [s['lable__active']]: isActive })}
        id={id}
        onClick={handleToggleTab}
      >
        {lable}
      </div>
      {isActive && <div className={s.border}></div>}
    </div>
  );
};
