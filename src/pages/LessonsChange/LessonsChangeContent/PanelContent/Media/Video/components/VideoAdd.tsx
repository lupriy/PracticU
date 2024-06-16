import React, { useState } from 'react';

import { Trashcan } from '../../Photo/icons';
import { TDataChange } from '../../../../types';
import s from './Video.module.scss';

type TProps = {
  id: number;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  handleDelete: () => void;
};

export const VideoAdd = ({ id, setData, handleDelete }: TProps) => {
  const [url, setUrl] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setUrl(value);
  };

  const handleSave = () => {
    setData(state => {
      return { ...state, [id]: { id, type: 'video', position: 0, value: url } };
    });
  };

  const handleFocus = () => {
    setIsDisabled(false);
  };

  const handleBlur = () => {
    const isUrl =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim.test(
        url
      );

    setIsDisabled(!isUrl);
  };

  return (
    <div className={s.videoAdd}>
      <button className={s.closeButton} onClick={handleDelete}>
        <Trashcan />
      </button>
      <p className={s.title}>Вставьте ссылку на видео</p>
      <p className={s.discription}>Работает с Kinescope</p>
      <div className={s.row}>
        <input
          className={s.input}
          placeholder='Ссылка на видео'
          value={url}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className={s.button} disabled={isDisabled} onClick={handleSave}>
          Добавить видео
        </button>
      </div>
    </div>
  );
};
