import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Buttons } from './Buttons';
import { TDataChange } from '../../../types';
import styles from './OpenAnswer.module.scss';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const MIN_TITLE_HEIGHT = 40;
const MIN_DESCRIPTION_HEIGHT = 28;

type TProps = {
  id: number;
  header: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  isRequired: boolean;
};

export const OpenAnswer = ({
  id,
  header,
  data,
  setData,
  isRequired,
}: TProps) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState(header);
  const [description, setDescription] = useState(data);
  const [isTaskRequired, setIsTaskRequired] = React.useState(isRequired);

  useEffect(() => {
    setData(state => ({
      ...state,
      [id]: {
        ...state[id],
        header: title,
        value: description,
        isTaskRequired,
      },
    }));
  }, [id, title, description, setData, isTaskRequired]);

  useLayoutEffect(() => {
    const scrollHeight = titleRef.current?.scrollHeight ?? 0;
    const heightPX = `${Math.max(scrollHeight, MIN_DESCRIPTION_HEIGHT)}px`;
    const style = titleRef.current?.style;

    if (style) {
      style.height = 'inherit';
      style.height = heightPX;
    }
  }, [title]);

  useLayoutEffect(() => {
    const scrollHeight = descriptionRef.current?.scrollHeight ?? 0;
    const heightPX = `${Math.max(scrollHeight, MIN_DESCRIPTION_HEIGHT)}px`;
    const style = descriptionRef.current?.style;

    if (style) {
      style.height = 'inherit';
      style.height = heightPX;
    }
  }, [description]);

  const handleChangeTitle: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const handleChangeDescription: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;
    setDescription(value);
  };
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isRequired = value === 'true';
    setIsTaskRequired(isRequired);
  };

  return (
    <div className={styles.block}>
      <Buttons id={id} setData={setData} />
      <textarea
        className={styles.title}
        placeholder='Название задания'
        rows={1}
        style={{
          minHeight: MIN_TITLE_HEIGHT,
        }}
        ref={titleRef}
        value={title}
        onChange={handleChangeTitle}
      />
      <textarea
        className={styles.description}
        placeholder='Текст задания'
        rows={1}
        style={{
          minHeight: MIN_DESCRIPTION_HEIGHT,
        }}
        ref={descriptionRef}
        value={description}
        onChange={handleChangeDescription}
      />
      {/* <button className={styles.save}>Сохранить</button> */}
      <FormControl className={styles.radioGroup}>
        <RadioGroup value={isTaskRequired} onChange={handleChangeRadio}>
          <FormControlLabel
            value={true}
            control={<Radio />}
            label='Обязательное'
            className={styles.radio}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label='Не обязательное'
            className={styles.radio}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
