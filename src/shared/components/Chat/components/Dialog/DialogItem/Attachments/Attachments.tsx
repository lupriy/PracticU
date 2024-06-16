import React, { useMemo } from 'react';

import { Attachment } from './Attachment';
import { Message } from '../../types';
import s from './styles.module.scss';

type Props = {
  messangeId: number;
  attachments: Message['attachments'];
  isTask: boolean;
  isRight: boolean;
};

export const Attachments = ({
  messangeId,
  attachments,
  isTask,
  isRight,
}: Props) => {
  const displayContent = useMemo(
    () =>
      attachments.map(({ id }) => (
        <Attachment
          key={id}
          messangeId={messangeId}
          attachmentId={id}
          isTask={isTask}
          isRight={isRight}
        />
      )),
    [attachments, messangeId, isTask, isRight]
  );

  const attachmentsLength = attachments.length;

  return attachmentsLength ? (
    <div className={s.block}>{displayContent}</div>
  ) : null;
};
