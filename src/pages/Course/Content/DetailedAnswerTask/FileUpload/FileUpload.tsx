import React, { useState } from 'react';
import cn from 'classnames';
import { api } from '../../../../../api';
import { Button } from '../../../../../shared/components/Button';
import { ReactComponent as CloseIcon } from '../../../../../shared/icons/close.svg';
import { ReactComponent as AttachmentIcon } from '../../../../../shared/icons/attachment.svg';
import { FileUploadProps } from './types';
import contentStyles from '../../styles.module.scss';
import styles from './styles.module.scss';
import { ReactComponent as DialogIcon } from '../../../../../shared/icons/dialog.svg';

export const FileUpload = ({
  labelId,
  onClick,
  handleChatClick,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setFiles([...files].concat(Array.from(event.target.files)));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskResultResponse = await onClick(e);

    if (taskResultResponse && files.length) {
      e.preventDefault();
      api.taskResult.taskResultAttachmentCreateAllCreate(
        taskResultResponse.toString(),
        files
      );
    }
  };

  const handleDelete = (file: File) =>
    setFiles(files.filter(item => item.lastModified !== file.lastModified));

  return (
    <>
      {!!files.length &&
        files.map((file, fileIndex) => (
          // Список динамический, по ключу удалятся все копии файла
          <div key={fileIndex} className={styles.file}>
            <img
              src={URL.createObjectURL(file)}
              alt=''
              className={styles.preview}
            />
            <div>
              <div className={styles['file-name-wrapper']}>
                <p className={cn(styles['file-name'], 'size-xs')}>
                  {file.name}
                </p>
                <CloseIcon
                  className={styles.icon}
                  onClick={() => handleDelete(file)}
                />
              </div>
              <p className={cn(styles['file-size'], 'size-xxs')}>
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>
        ))}
      <label htmlFor={`upload-${labelId}`}>
        <div className={styles['input-wrapper']}>
          <AttachmentIcon />
          <input
            id={`upload-${labelId}`}
            type='file'
            onChange={handleChange}
            className={styles.input}
            multiple
          />
          <p className='size-m'>Прикрепить файлы</p>
        </div>
        <div className={contentStyles['task-buttons']}>
          <Button withTheme onClick={handleClick}>
            Отправить
          </Button>
          <button
            onClick={handleChatClick}
            className={cn(styles.button, 'size-m')}
          >
            <DialogIcon />
            Задать вопрос
          </button>
        </div>
      </label>
    </>
  );
};
