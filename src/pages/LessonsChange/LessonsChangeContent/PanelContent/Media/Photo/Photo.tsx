import React, { useCallback } from 'react';

import { MediaPhotoArea, PhotoContent } from './components';
import { TDataChange } from '../../../types';

type TProps = {
  id: number;
  data: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const Photo = ({ id, data, setData }: TProps) => {
  const handleDelete = useCallback(() => {
    setData(state => {
      const newState = state;
      delete newState[id];
      return { ...newState };
    });
  }, [id, setData]);

  return data ? (
    <PhotoContent
      data={data}
      id={id}
      setData={setData}
      handleDelete={handleDelete}
    />
  ) : (
    <MediaPhotoArea id={id} handleDelete={handleDelete} setData={setData} />
  );
};
