import React, { useEffect } from 'react';
import { Close } from '@mui/icons-material';

import s from './styles.module.scss';

type Props = {
  children: React.ReactChild;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContainet = ({ children, setIsVisible }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = e => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <div className={s.background}>
      <div className={s.block}>
        <button className={s.button} onClick={handleClose}>
          <Close sx={{ fontSize: 24, color: '#9AA1B0' }} />
        </button>
        {children}
      </div>
    </div>
  );
};
