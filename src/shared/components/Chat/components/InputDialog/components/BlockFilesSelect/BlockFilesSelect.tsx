import React, { useMemo } from 'react';

import { BlockFilesSelectItem } from './BlockFilesSelectItem';
import s from './styles.module.scss';

type Props = {
  filesSelect: File[];
  setFilesSelect: React.Dispatch<React.SetStateAction<File[]>>;
};

export const BlockFilesSelect = ({ filesSelect, setFilesSelect }: Props) => {
  const displayContent = useMemo(
    () =>
      filesSelect.map((item, index) => {
        const { size, name } = item;

        return (
          <BlockFilesSelectItem
            key={index}
            id={index}
            size={size}
            name={name}
            setFilesSelect={setFilesSelect}
          />
        );
      }),
    [filesSelect, setFilesSelect]
  );

  return <div className={s.block}>{displayContent}</div>;
};
