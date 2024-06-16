import React from 'react';

import s from './styles.module.scss';

type Props = {
  text: string;
};

export const PanelDate = ({ text }: Props) => (
  <div className={s.block}>{text}</div>
);
