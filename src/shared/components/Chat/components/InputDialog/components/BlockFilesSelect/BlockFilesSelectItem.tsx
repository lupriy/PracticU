import React from 'react';
import { Close } from '@mui/icons-material';

import s from './styles.module.scss';

const BYTES_IN_MBYTE = 1048576;

type Props = {
  id: number;
  size: number;
  name: string;
  setFilesSelect: React.Dispatch<React.SetStateAction<File[]>>;
};

export const BlockFilesSelectItem = ({
  id,
  size,
  name,
  setFilesSelect,
}: Props) => {
  const handleDelete = () => {
    setFilesSelect(state => state.filter((item, index) => index !== id));
  };

  const sizeFormat = (size / BYTES_IN_MBYTE).toFixed(1);

  return (
    <div className={s.item}>
      {/* <div className={s.photo}></div> */}
      <div>
        <div className={s.name}>{name}</div>
        <div className={s.size}>{sizeFormat} МБ</div>
      </div>
      <button className={s.button}>
        <Close sx={{ fontSize: 20, color: '#DA1B32' }} onClick={handleDelete} />
      </button>
    </div>
  );
};
