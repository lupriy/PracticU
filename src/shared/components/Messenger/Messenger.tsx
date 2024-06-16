import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

import { ID_TECHNICAL_SUPPORT_WIDGET } from 'shared/constants/constants';
import { QUERY_MESSENGER_CHAT_ID } from 'shared/constants/queries';
import { useGetQueryParameter } from 'shared/hooks';
import { LeftContent, RightContent } from './components';
import { MIN_WIDTH_WINDOW } from './constants';
import s from './styles.module.scss';

type Props = {
  heightHeader: number;
};

export const Messenger = ({ heightHeader }: Props) => {
  const idChatSelect = useGetQueryParameter({
    query: QUERY_MESSENGER_CHAT_ID,
  });
  const {
    width: widthWindow, //для адаптивной верстки
    height: heightWindow,
  } = useWindowSize();
  const [idsDialogs, setIdsDialogs] = useState<number[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const technicalSupportWidget = document.getElementById(
      ID_TECHNICAL_SUPPORT_WIDGET
    );

    if (technicalSupportWidget) {
      technicalSupportWidget.style.display = 'none';

      return () => {
        technicalSupportWidget.style.display = 'block';
      };
    }
  }, []);

  const height = heightWindow - heightHeader;
  const isModileMode = widthWindow < MIN_WIDTH_WINDOW;

  const isVisibleLeftContent = isModileMode ? !idChatSelect : true;
  const isVisibleRightContent = isModileMode ? !!idChatSelect : true;

  return (
    <div className={s.content} style={{ minHeight: `${height}px` }}>
      <LeftContent
        idChatSelect={idChatSelect ?? ''}
        heightHeader={heightHeader}
        isModileMode={isModileMode}
        setIdsDialogs={setIdsDialogs}
        isVisible={isVisibleLeftContent}
      />
      <RightContent
        idChatSelect={idChatSelect ?? ''}
        idsDialogs={idsDialogs}
        isModileMode={isModileMode}
        heightHeader={heightHeader}
        isVisible={isVisibleRightContent}
      />
    </div>
  );
};
