import React, { useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import cn from 'classnames';

import { EXTRA_SPACE_IN_MOBILE_MODE } from './constants';
import { Chat } from '../../../';
import { disassembleQueryChatId } from '../../../../utils';
import { Header, Plug } from './';
import s from './styles.module.scss';

type Props = {
  idChatSelect: string;
  idsDialogs: number[];
  heightHeader: number;
  isModileMode: boolean;
  isVisible: boolean;
};

export const RightContent = ({
  idChatSelect,
  idsDialogs,
  heightHeader: heightHeaderProp,
  isModileMode,
  isVisible,
}: Props) => {
  const refHeader: React.LegacyRef<HTMLDivElement> = useRef(null);
  const { height: heightWindow, width: widthWindow } = useWindowSize();
  const { chatId, courseId, studentId } = disassembleQueryChatId({
    chatId: idChatSelect,
  });

  const [idRecipient, setIdRecipient] = useState(0);

  const isSelect = useMemo(
    () => idsDialogs.some(item => item === chatId),
    [idsDialogs, chatId]
  );

  const heightTotalHeader = isModileMode
    ? heightHeaderProp - EXTRA_SPACE_IN_MOBILE_MODE
    : heightHeaderProp;

  return (
    <div
      className={cn(s.block, {
        [s.block__mobile]: isModileMode,
        [s.block__mobile__isNotVisible]: !isVisible,
      })}
    >
      <Header
        ref={refHeader}
        idChatSelect={idChatSelect}
        isSelect={isSelect}
        isModileMode={isModileMode}
        setIdRecipient={setIdRecipient}
      />
      {isSelect ? (
        <Chat
          chatId={chatId}
          courseId={courseId}
          studentId={studentId}
          idRecipient={idRecipient}
          heightBlock={heightWindow}
          refHeader={refHeader}
          heightTotalHeader={heightTotalHeader}
          updateRender={widthWindow}
        />
      ) : (
        <Plug />
      )}
    </div>
  );
};
