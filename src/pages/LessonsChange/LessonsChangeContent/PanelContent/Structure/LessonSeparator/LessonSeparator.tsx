import React, { useEffect, useRef, useState } from 'react';
import s from './LessonSeparator.module.scss';
import { DeleteButton } from '../../../../../../shared/components/DeleteButton/DeleteButton';
import { TDataChange } from '../../../types';

import { COLOR_BY_TAG } from '../../../../../../shared/theme/themes';
import { ColorByTagKey } from '../../../../../../shared/theme/themes.types';

type TProps = {
  id: number;
  // position: number;
  initialValue: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  courseTag: string;
};

export const LessonSeparator = ({
  id,
  setData,
  courseTag,
  initialValue,
}: TProps) => {
  const [buttonText, setButtonText] = useState(initialValue || 'Дальше');
  const buttonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setData(state => ({
      ...state,
      [id]: {
        ...state[id],
        type: 'separator',
        text: buttonText,
      },
    }));
  }, [id, buttonText, setData]);

  const buttonColor = COLOR_BY_TAG[courseTag as ColorByTagKey];

  const editButtonClick = () => {
    buttonRef.current?.focus();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  return (
    <div className={s.separator}>
      <button className={s.editBtn} onClick={editButtonClick}>
        Редактировать название кнопки
      </button>
      <DeleteButton id={id} setData={setData} className={s.deleteBtn} />
      <div className={s.content}>
        <h3>Разделитель урока</h3>
        <p>Ученик увидит кнопку перехода к следующей части урока.</p>
        <input
          value={buttonText}
          onChange={handleTextChange}
          ref={buttonRef}
          className={s.button}
          style={{
            backgroundColor: buttonColor ?? 'black',
            width: `${buttonText.length * 15}px`,
          }}
        />
      </div>
    </div>
  );
};
