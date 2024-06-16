import React, { useCallback } from 'react';

import { VideoAdd, VideoContent } from './components';
import { TDataChange } from '../../../types';
import s from './Video.module.scss';

type TProps = {
  id: number;
  data: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const Video = ({ id, data, setData }: TProps) => {
  const handleDelete = useCallback(() => {
    setData(state => {
      const newState = state;
      delete newState[id];
      return { ...newState };
    });
  }, [id, setData]);

  return (
    <div className={s.block}>
      {data ? (
        <VideoContent video={data} handleDelete={handleDelete} />
      ) : (
        <VideoAdd id={id} setData={setData} handleDelete={handleDelete} />
      )}
    </div>
  );
};
