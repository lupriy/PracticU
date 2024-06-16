import React, { useRef, useState } from 'react';

import { DragAndDropCursor } from './DragAndDropCursor';
import { TMousePos } from '../types';
import { TDataChange } from '../../../../types';
import { api } from '../../../../../../../api';
import { QUERY_LESSON_ID } from '../../../../../../../shared/constants/queries';
import { useGetQueryParameter } from '../../../../../../../shared/hooks';
import s from './MediaPhotoArea.module.scss';

const MAX_FILE_SIZE = 11004936;

type TProps = {
  id: number;
  handleDelete: () => void;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

export const MediaPhotoDevice = ({ id: realId, setData }: TProps) => {
  const idLesson = useGetQueryParameter({ query: QUERY_LESSON_ID });
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragAndDrop, setIsDragAndDrop] = useState(false);
  const [filesCount, setFilesCount] = useState(1);
  const [mousePos, setMousePos] = useState<TMousePos | null>(null);

  const uploadFilesHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files: eventFiles } = e.target;

    if (eventFiles) {
      const files = Object.values(eventFiles);
      const filesSize = files.reduce((sum, file) => (sum += file.size), 0);
      setFilesCount(files.length);

      if (filesSize > MAX_FILE_SIZE) {
        alert('Файл слишком большой');
      } else if (idLesson) {
        try {
          const res = await api.lesson.lessonAttachmentCreate(idLesson, {
            filename: files[0].name,
            content_type: 'photo',
          });
          const {
            data: { id },
          } = res;

          const attachment = await api.lesson.lessonAttachmentDataCreate(
            String(id),
            idLesson,
            files
          );
          const { url } = attachment;

          setData(state => ({
            ...state,
            [realId]: {
              ...state[realId],
              value: url,
            },
          }));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const dragStartHandler: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    setIsDragAndDrop(true);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    setIsDragAndDrop(false);
  };

  const dragOverHandler: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    setIsDragAndDrop(true);
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const onDropHandler: React.DragEventHandler<HTMLDivElement> = async e => {
    e.preventDefault();
    setIsDragAndDrop(false);

    const files = Object.values(e.dataTransfer.files);
    const filesSize = files.reduce((sum, file) => (sum += file.size), 0);
    setFilesCount(files.length);

    if (filesSize > MAX_FILE_SIZE) {
      alert('Файл слишком большой');
    } else if (idLesson) {
      try {
        const res = await api.lesson.lessonAttachmentCreate(idLesson, {
          filename: files[0].name,
          content_type: 'photo',
        });
        const {
          data: { id },
        } = res;

        const attachment = await api.lesson.lessonAttachmentDataCreate(
          String(id),
          idLesson,
          files
        );

        const { url } = attachment;

        setData(state => ({
          ...state,
          [realId]: {
            ...state[realId],
            value: url,
          },
        }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={s.main}>
      <div className={s.head}>Перенесите одно или несколько изображений</div>

      <div className={s.format}>Формат jpg, png, heic, не более 5 Мб.</div>

      <div
        className={s.dropZone}
        onDragStart={dragStartHandler}
        onDragOver={dragOverHandler}
        onDrop={onDropHandler}
        onDragEnd={handleDragEnd}
      >
        {isDragAndDrop && mousePos ? (
          <div onDragStart={dragStartHandler} onDragEnd={handleDragEnd}>
            <DragAndDropCursor mousePos={mousePos} filesCount={filesCount} />
          </div>
        ) : (
          <button className={s.button} onClick={handleClick}>
            <input
              className={s.hidden}
              type={'file'}
              ref={inputRef}
              onChange={uploadFilesHandler}
              multiple
              accept={'image/jpeg,image/png,image/heic'}
              name={'photo'}
            />
            Выбрать изображения
          </button>
        )}
      </div>
    </div>
  );
};
