import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { DeleteButton } from './DeleteButton';
import { TDataChange } from '../../types';
import { COLOR_BY_TAG } from '../../../../../shared/theme/themes';
import { ColorByTagKey } from '../../../../../shared/theme/themes.types';

import styles from './ImportantThought.module.scss';

const MIN_TITLE_HEIGHT = 30;
const MIN_DESCRIPTION_HEIGHT = 28;

type TProps = {
  id: number;
  value: string;
  courseTag: string;
  header?: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const ImportantThought = ({
  id,
  value,
  courseTag,
  header,
  setData,
}: TProps) => {
  const borderColor = COLOR_BY_TAG[(courseTag || 'other') as ColorByTagKey];
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState(header);
  const [description, setDescription] = useState(value);

  useEffect(() => {
    setData(state => ({
      ...state,
      [id]: {
        ...state[id],
        header: title,
        value: description,
      },
    }));
  }, [id, title, description, setData]);

  useLayoutEffect(() => {
    const scrollHeight = titleRef.current?.scrollHeight ?? 0;
    const heightPX = `${Math.max(scrollHeight, MIN_TITLE_HEIGHT)}px`;
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

  return (
    <div
      className={styles.block}
      style={{ border: `4px solid ${borderColor}` }}
    >
      <DeleteButton id={id} setData={setData} />
      <textarea
        className={styles.title}
        placeholder='ВВЕДИТЕ ЗАГОЛОВОК'
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
        placeholder='Введите текст'
        rows={1}
        style={{
          minHeight: MIN_DESCRIPTION_HEIGHT,
        }}
        ref={descriptionRef}
        value={description}
        onChange={handleChangeDescription}
      />
    </div>
  );
};
