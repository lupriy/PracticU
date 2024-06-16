import React, { forwardRef, useEffect, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import cn from 'classnames';

import { api } from '../../../../api';
import { Button } from '../../../../shared/components/Button';
import { TaskResultModalProps } from './types';
import styles from './styles.module.scss';

const { taskResultRetrieve, taskResultAttachmentDataRetrieve } = api.taskResult;

export const TaskResultModal = forwardRef(
  (
    {
      id,
      withButtons,
      currentTaskResultId,
      onAccept,
      onReject,
      /* content, */
      attachments,
      matchesDesktop,
    }: TaskResultModalProps,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const [content, setContent] = useState('');

    useEffect(() => {
      const asyncEffect = async () => {
        try {
          const res = await taskResultRetrieve(id, {
            group: 'mentor',
          });
          const content = res.data.content as string;

          if (content) {
            const contentStr = JSON.parse(content).text;
            setContent(contentStr);
          }
        } catch (e) {
          console.error(e);
        }
      };

      asyncEffect();
    }, [id]);

    const handleDownloadButtonClick = async (id: number, fileName: string) => {
      try {
        const response = await taskResultAttachmentDataRetrieve(
          id.toString(),
          currentTaskResultId.toString()
        );
        const responseBlob = await response.blob();
        const blob = new Blob([responseBlob]);
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.parentNode && link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <div
        className={cn(styles.wrapper, {
          [styles['modal-mobile']]: !matchesDesktop,
        })}
        ref={ref}
      >
        <p>{content}</p>
        {attachments.map(file => {
          return (
            <div
              key={file.id}
              className={styles.file}
              onClick={() => handleDownloadButtonClick(file.id, file.filename)}
            >
              <AttachFileIcon />
              <span>{file.filename}</span>
            </div>
          );
        })}
        {withButtons && (
          <div className={styles.buttons}>
            <Button color='success' onClick={onAccept}>
              Принять
            </Button>
            <Button color='error' onClick={onReject}>
              Отклонить
            </Button>
          </div>
        )}
      </div>
    );
  }
);
