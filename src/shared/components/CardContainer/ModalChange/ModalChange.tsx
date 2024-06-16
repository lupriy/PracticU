import React, { useState, useMemo, useEffect } from 'react';
import { TextField } from '@mui/material';

import { Cross, SmallBack } from '../icons';
import styles from './ModalChange.module.scss';

type TLessons = {
  id: number;
  module: number;
  name: string;
  description: string;
  position: number;
};

type TModule = {
  course: number;
  description: string;
  id: number;
  lessons: TLessons[];
  name: string;
  position: number;
};

interface IProps {
  isModules?: boolean;
  isMobile?: boolean;
  selectedItem: TModule | TLessons | null;
  setIsOpenModalChange: (state: boolean) => void;
  handleSave: (name: string, description: string) => Promise<void>;
}

export const ModalChange = ({
  isModules,
  isMobile,
  selectedItem,
  setIsOpenModalChange,
  handleSave,
}: IProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isDisabled = useMemo(() => !(name && description), [name, description]);

  useEffect(() => {
    if (selectedItem) {
      const { name, description } = selectedItem;

      setName(name || '');
      setDescription(description || '');
    }
  }, [selectedItem]);

  const handleClose = () => setIsOpenModalChange(false);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setDescription(value);
  };

  const handleClickSave = () => handleSave(name, description);

  const title = `Изменить ${isModules ? 'модуль' : 'урок'}`;

  return (
    <div className={styles.modal}>
      {isMobile ? (
        <div className={styles.back} onClick={handleClose}>
          <SmallBack />
          <div className={styles.backTitle}>{title}</div>
        </div>
      ) : (
        <div className={styles.button}>
          <Cross closeModal={handleClose} />
        </div>
      )}

      <div className={styles.title}>{title}</div>
      <TextField
        id='name'
        value={name}
        label='Название'
        variant='outlined'
        className={styles.input}
        onChange={handleChangeName}
      />
      <TextField
        id='description'
        value={description}
        label='Описание'
        variant='outlined'
        multiline
        rows={4}
        className={styles.description}
        onChange={handleChangeDescription}
      />

      <button
        className={styles.buttonSave}
        disabled={isDisabled}
        onClick={handleClickSave}
      >
        Сохранить
      </button>
    </div>
  );
};
