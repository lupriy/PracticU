import React, { useState, useMemo } from 'react';
import { TextField } from '@mui/material';

import { Cross, SmallBack } from '../icons';
import styles from './ModalAdd.module.scss';

interface IProps {
  isModules?: boolean;
  isMobile?: boolean;
  setIsOpenModalAdd(state: boolean): void;
  handleSave(name: string, description: string): Promise<void>;
}

export const ModalAdd = ({
  isModules,
  isMobile,
  setIsOpenModalAdd,
  handleSave,
}: IProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isDisabled = useMemo(() => !(name && description), [name, description]);

  const handleClose = () => setIsOpenModalAdd(false);

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

  const title = `Новый ${isModules ? 'модуль' : 'урок'}`;

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
