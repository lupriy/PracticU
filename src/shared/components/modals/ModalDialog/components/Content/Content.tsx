import React, { useMemo } from 'react';
import { useWindowSize } from 'react-use';

import {
  PADDING_BACKGROUND,
  PADDING_BLOCK,
  MAX_WIDTH,
  MAX_HEIGHT,
  HEIGHT_HEADER,
} from './constants';
import { Chat } from '../../../../';
import s from './styles.module.scss';

type Props = {
  chatId: number;
  studentId: number;
  courseId: number;
  mentorId: number;
};

export const Content = ({ chatId, studentId, courseId, mentorId }: Props) => {
  const { width: widthWindow, height: heightWindow } = useWindowSize();

  const width = useMemo(() => {
    const paddingBackground = PADDING_BACKGROUND * 2;
    const paddingBlock = PADDING_BLOCK * 2;
    const width = widthWindow - paddingBackground - paddingBlock;

    if (width > MAX_WIDTH) {
      return MAX_WIDTH;
    }

    return width;
  }, [widthWindow]);

  const height = useMemo(() => {
    const paddingBackground = PADDING_BACKGROUND * 2;
    const paddingBlock = PADDING_BLOCK * 2;
    const height =
      heightWindow - paddingBackground - paddingBlock - HEIGHT_HEADER;

    if (height > MAX_HEIGHT) {
      return MAX_HEIGHT;
    }

    return height;
  }, [heightWindow]);

  return (
    <div className={s.block} style={{ width }}>
      <Chat
        chatId={chatId}
        courseId={courseId}
        studentId={studentId}
        idRecipient={mentorId}
        heightBlock={height}
        classNameInputDialog={s.inputDialog}
      />
    </div>
  );
};
