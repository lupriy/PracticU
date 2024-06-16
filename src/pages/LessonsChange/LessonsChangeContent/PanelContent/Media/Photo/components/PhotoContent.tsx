import React, { useEffect, useState } from 'react';

import s from './PhotoContent.module.scss';
import { TDataChange } from '../../../../../LessonsChangeContent/types';

type TProps = {
  data: string;
  id: number;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  handleDelete: () => void;
};

export const PhotoContent = ({ data, id, setData, handleDelete }: TProps) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    setData(state => ({
      ...state,
      [id]: {
        ...state[id],
        photoLabel: label,
      },
    }));
  }, [label, setData, id]);

  const handleChangeLabel = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLabel(e.target.value);
  };

  return (
    <div className={s.photoContent}>
      <img alt='' className={s.photo} src={data} />
      <button className={s.button} onClick={handleDelete}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.6598 5.66125L16.4466 19.4858H7.55258L6.33966 5.66125L4.80273 5.79598L6.03781 19.8712C6.10281 20.5199 6.66571 21.0286 7.31963 21.0286H16.6796C17.3333 21.0286 17.8964 20.5202 17.9625 19.8619L19.1968 5.79598L17.6598 5.66125Z'
            fill='white'
          />
          <path
            d='M14.8276 2H9.17049C8.46153 2 7.88477 2.57677 7.88477 3.28573V5.72859H9.4276V3.54284H14.5704V5.72855H16.1133V3.28569C16.1133 2.57677 15.5366 2 14.8276 2Z'
            fill='white'
          />
          <path
            d='M20.2285 4.95715H3.77144C3.34534 4.95715 3 5.30249 3 5.72859C3 6.15469 3.34534 6.50003 3.77144 6.50003H20.2286C20.6547 6.50003 21 6.15469 21 5.72859C21 5.30249 20.6546 4.95715 20.2285 4.95715Z'
            fill='white'
          />
        </svg>
      </button>

      <input
        placeholder='+ Добавить подпись'
        className={s.label}
        value={label}
        onChange={handleChangeLabel}
      />
    </div>
  );
};
