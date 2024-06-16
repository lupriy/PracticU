import React from 'react';
import { TDataChange } from '../../types';

import styles from './ImportantThought.module.scss';

type TProps = {
  id: number;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const DeleteButton = ({ id, setData }: TProps) => {
  const handleDelete = () => {
    setData(state => {
      const newState = state;
      delete newState[id];
      return { ...newState };
    });
  };
  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17.6618 5.66125L16.4486 19.4858H7.55453L6.34161 5.66125L4.80469 5.79598L6.03976 19.8712C6.10476 20.5199 6.66766 21.0286 7.32158 21.0286H16.6816C17.3352 21.0286 17.8984 20.5202 17.9644 19.8619L19.1987 5.79598L17.6618 5.66125Z'
          fill='white'
        />
        <path
          d='M14.8296 2H9.17245C8.46348 2 7.88672 2.57677 7.88672 3.28573V5.72859H9.42955V3.54284H14.5724V5.72855H16.1152V3.28569C16.1153 2.57677 15.5385 2 14.8296 2Z'
          fill='white'
        />
        <path
          d='M20.2285 4.95715H3.77144C3.34534 4.95715 3 5.30249 3 5.72859C3 6.15469 3.34534 6.50003 3.77144 6.50003H20.2286C20.6547 6.50003 21 6.15469 21 5.72859C21 5.30249 20.6546 4.95715 20.2285 4.95715Z'
          fill='white'
        />
      </svg>
    </button>
  );
};
