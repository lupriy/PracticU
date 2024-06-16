import React from 'react';
import { Modal, Slider } from '@mui/material';

import closeIcon from '../../../../shared/icons/closeGray.svg';
import { Button } from '../../../../shared/components/Button';

import s from './PopupProfile.module.scss';

const SCALE_STEP = 0.1;

type PropsType = {
  isOpen: boolean;
  selectedFile: File | null;
  scale: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  handleModalClose: () => void;
};

export const PopupProfile = ({
  isOpen,
  selectedFile,
  scale,
  setIsOpen,
  setScale,
  handleModalClose,
}: PropsType) => {
  const profileImgSrc = selectedFile ? URL.createObjectURL(selectedFile) : '';

  const handleZoomIn = () => {
    if (scale < 2) {
      setScale(scale + SCALE_STEP);
    }
  };

  const handleZoomOut = () => {
    if (scale > 1) {
      setScale(scale - SCALE_STEP);
    }
  };

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleSubmit = () => {
    setScale(scale);
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
      <div className={s.popup}>
        <img
          alt=''
          className={s.close}
          src={closeIcon}
          onClick={handleModalClose}
        />
        <h1>Выберите область</h1>

        <div className={s.imgWrapper}>
          <img
            src={profileImgSrc}
            alt='Selected file'
            className={s.image}
            style={{ transform: `scale(${scale})` }}
          />
          <div className={s.layerTop} />
        </div>

        <div className={s.buttons}>
          <button className={s.button} onClick={handleZoomOut}>
            -
          </button>
          <div className={s.slider}>
            <Slider
              size='small'
              min={1}
              max={2}
              step={0.1}
              value={scale}
              onChange={handleChangeSlider}
              style={{ color: '#59647A' }}
            />
          </div>
          <button className={s.button} onClick={handleZoomIn}>
            +
          </button>
        </div>
        <Button
          type='primary'
          children='Готово'
          disabled={false}
          color='brunoyam'
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};
