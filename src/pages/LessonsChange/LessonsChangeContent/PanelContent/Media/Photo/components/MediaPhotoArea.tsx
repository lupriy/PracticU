import React, { useState } from 'react';
import cn from 'classnames';

import { MediaPhotoUrl } from './MediaPhotoUrl';
import { MediaPhotoDevice } from './MediaPhotoDevice';
import { TDataChange } from '../../../../types';
import { Trashcan } from '../icons';
import s from './MediaPhotoArea.module.scss';

const ID_TOOL_URL = 'TOOL_URL';
const ID_TOOL_DEVICE = 'TOOL_DEVICE';

type TProps = {
  id: number;
  handleDelete: () => void;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const MediaPhotoArea = ({
  id: realId,
  handleDelete,
  setData,
}: TProps) => {
  const [tool, setTool] = useState(ID_TOOL_URL);

  const handleChangeTool: React.MouseEventHandler<HTMLDivElement> = e => {
    const { id } = e.currentTarget;
    setTool(id);
  };

  return (
    <>
      <div className={s.header}>
        <div
          className={cn(s.item, tool === ID_TOOL_URL ? s.item_active : '')}
          id={ID_TOOL_URL}
          onClick={handleChangeTool}
        >
          По ссылке
        </div>
        <div
          className={cn(s.item, tool === ID_TOOL_DEVICE ? s.item_active : '')}
          id={ID_TOOL_DEVICE}
          onClick={handleChangeTool}
        >
          Загрузить с устройства
        </div>
        <div className={s.delete}>
          <div className={s.img} onClick={handleDelete}>
            <Trashcan />
          </div>
        </div>
      </div>

      {tool === ID_TOOL_DEVICE ? (
        <MediaPhotoDevice
          id={realId}
          handleDelete={handleDelete}
          setData={setData}
        />
      ) : (
        <MediaPhotoUrl
          id={realId}
          handleDelete={handleDelete}
          setData={setData}
        />
      )}
    </>
  );
};
