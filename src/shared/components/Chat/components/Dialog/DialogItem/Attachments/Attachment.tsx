import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { api } from '../../../../../../../api';
import s from './styles.module.scss';

const { taskResultAttachmentRetrieve } = api.taskResult;
const { messageAttachmentRetrieve } = api.message;

type Props = {
  messangeId: number;
  attachmentId: number;
  isTask: boolean;
  isRight: boolean;
};

export const Attachment = ({
  messangeId,
  attachmentId,
  isTask,
  isRight,
}: Props) => {
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');

  const getAttachmentTask = useCallback(
    async (
      attachmentId: Props['attachmentId'],
      messangeId: Props['messangeId'],
      isCancelled: boolean
    ) => {
      const res = await taskResultAttachmentRetrieve(
        //@ts-ignore
        attachmentId,
        messangeId
      );

      const { data, url } = res;
      const { filename } = data;

      if (!isCancelled) {
        setUrl(url);
        setFilename(filename);
      }

      return res;
    },
    []
  );

  const getAttachmentMessage = useCallback(
    async (
      attachmentId: Props['attachmentId'],
      messangeId: Props['messangeId'],
      isCancelled: boolean
    ) => {
      const res = await messageAttachmentRetrieve(
        //@ts-ignore
        attachmentId,
        messangeId
      );
      const { data, url } = res;
      const { filename } = data;

      if (!isCancelled) {
        setUrl(url);
        setFilename(filename);
      }

      return res;
    },
    []
  );

  useEffect(() => {
    let isCancelled = false;

    const asyncEffect = async () => {
      try {
        if (isTask) {
          getAttachmentTask(attachmentId, messangeId, isCancelled);
        } else {
          getAttachmentMessage(attachmentId, messangeId, isCancelled);
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();

    return () => {
      isCancelled = true;
    };
  }, [
    attachmentId,
    messangeId,
    isTask,
    getAttachmentMessage,
    getAttachmentTask,
  ]);

  return (
    <div className={cn(s.item, { [s.item__right]: isRight })}>
      <a
        href={`${url}data`}
        download={filename}
        target='_blank'
        rel='noopener noreferrer'
      >
        {filename}
      </a>
    </div>
  );
};
