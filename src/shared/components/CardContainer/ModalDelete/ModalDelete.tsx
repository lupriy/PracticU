import React from 'react';

import styles from './ModalDelete.module.scss';

interface IProps {
  name: string;
  setIsOpenModalChange: (state: boolean) => void;
  deleteModule: () => Promise<void>;
}

export const ModalDelete = ({
  name,
  setIsOpenModalChange,
  deleteModule,
}: IProps) => {
  const handleClose = () => setIsOpenModalChange(false);

  return (
    <div className={styles.modal}>
      <div className={styles.title}>Удалить {name}?</div>
      <div className={styles.desc}>
        Вы уверены, что хотите удалить этот урок?
        <br />
        Отменить удаление будет невозможно.
      </div>

      <div className={styles.lineButtons}>
        <div className={styles.buttonSave} onClick={deleteModule}>
          Да, удалить
        </div>
        <div className={styles.button} onClick={handleClose}>
          Отмена
        </div>
      </div>
    </div>
  );
};
