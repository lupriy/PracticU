import React, { useRef } from 'react';
import { ReactComponent as ClipIcon } from './clip.svg';

import s from '../../styles.module.scss';

//URL.createObjectURL(file)

type Props = {
  setFilesSelect: React.Dispatch<React.SetStateAction<File[]>>;
};

export const SelectorFiles = ({ setFilesSelect }: Props) => {
  const ref: React.LegacyRef<HTMLInputElement> = useRef(null);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    try {
      const { files } = e.currentTarget;

      if (files) {
        const filesArr = Array.from(files);
        setFilesSelect(state => [...state, ...filesArr]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <input
        ref={ref}
        type='file'
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button className={s.buttonClip} onClick={handleClick}>
        <ClipIcon />
      </button>
    </>
  );
};
