import React, { useEffect } from 'react';

import { ApproveIcon, RejectIcon } from './icons';
import { ID_RESPONSE_ERROR, ID_RESPONSE_APPROVE } from '../constans';
import s from './StatusBlock.module.scss';

type TProps = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TIME = 5000;

export const StatusBlock = ({ status, setStatus }: TProps) => {
  useEffect(() => {
    const id = setTimeout(() => setStatus(''), TIME);

    return () => clearTimeout(id);
  }, [setStatus]);

  return (
    <>
      {status === ID_RESPONSE_APPROVE && (
        <div className={s.approve}>
          <ApproveIcon />
          <p>Сохранено</p>
        </div>
      )}
      {status === ID_RESPONSE_ERROR && (
        <div className={s.reject}>
          <RejectIcon />
          <p>
            Не удалось сохранить изменения. <br />
            Проверьте подключение к интернету.
            <br />
            <u>Сохранить</u>
          </p>
        </div>
      )}
    </>
  );
};
