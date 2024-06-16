import React, { useState } from 'react';
import { TDataChange } from '../../../../types';

import s from './MediaPhotoArea.module.scss';

type TProps = {
  id: number;
  handleDelete: () => void;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const MediaPhotoUrl = ({ id: realId, setData }: TProps) => {
  const [url, setUrl] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeUrl: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget;
    setUrl(value);
  };

  const savePhoto = () => {
    setData(state => ({
      ...state,
      [realId]: {
        ...state[realId],
        value: url,
      },
    }));
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
    <div className={s.block}>
      <div className={s.title}>Вставьте ссылку на фото</div>
      <div className={s.blockInput}>
        <input
          className={s.input}
          placeholder='Ссылка на фото'
          value={url}
          onChange={handleChangeUrl}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className={s.buttonAdd}
          disabled={isDisabled}
          onClick={savePhoto}
        >
          Добавить фото
        </button>
      </div>
    </div>
  );
};
