import React from 'react';
import cn from 'classnames';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import styles from './CardContainerItem.module.scss';

const formatedPosition = (number: number) => {
  if (number < 10) return `0${number}`;
  return `${number}`;
};

interface IProps {
  id: number;
  isUserManager: boolean;
  name: string;
  description: string;
  position: number;
  setIsOpenModalChange: (state: boolean) => void;
  setIsOpenModalDelete: (state: boolean) => void;
  setSelectedItemId: (state: number) => void;
  getLessons?: (id: number) => void;
  isLesson?: boolean;
}

export const CardContainerItem = ({
  id,
  isUserManager,
  name,
  description,
  position,
  setIsOpenModalChange,
  setSelectedItemId,
  setIsOpenModalDelete,
  getLessons = () => {},
  isLesson,
}: IProps) => {
  const handleChange: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    setIsOpenModalChange(true);
    setSelectedItemId(id);
  };

  const handleDelete: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    setIsOpenModalDelete(true);
    setSelectedItemId(id);
  };

  const handleClick = () => {
    if (isUserManager) {
      getLessons(id);
    } else if (!isLesson) {
      getLessons(id);
    }
  };

  return (
    <div
      className={cn(styles.card, isUserManager ? '' : styles.card__notManager)}
      onClick={handleClick}
    >
      <div className={styles.actions}>
        <span className={styles.item} onClick={handleChange}>
          <ModeEditOutlineOutlinedIcon style={{ color: 'white' }} />
        </span>
        <span className={styles.item} onClick={handleDelete}>
          <DeleteOutlinedIcon style={{ color: 'white' }} />
        </span>
      </div>

      <div className={styles.container}>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.position}>{formatedPosition(position)}</div>
    </div>
  );
};
