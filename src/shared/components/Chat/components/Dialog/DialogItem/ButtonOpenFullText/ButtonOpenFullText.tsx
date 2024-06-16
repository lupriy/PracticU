import React from 'react';

import s from './styles.module.scss';

type Props = {
  isOpenFullText: boolean;
  setIsOpenFullText: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ButtonOpenFullText = ({
  isOpenFullText,
  setIsOpenFullText,
}: Props) => {
  const handleClick = () => setIsOpenFullText(state => !state);

  const textButton = isOpenFullText ? 'Свернуть' : 'Развернуть';

  return (
    <div className={s.block}>
      <button className={s.button} onClick={handleClick}>
        {textButton} сообщение
      </button>
    </div>
  );
};
