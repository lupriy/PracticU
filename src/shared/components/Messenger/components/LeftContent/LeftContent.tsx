import React, { useEffect, useRef, useState, useContext } from 'react';
import cn from 'classnames';

import { WebsocketMessageContext } from 'contexts';
import { WEBSOCKET_TYPE } from 'shared/constants/websocket';
import { useAppSelector } from 'redux/hooks';
import { userGroupSelector } from 'redux/user/selectors';
import { api, Chat } from 'api';
import { Header, ListDialogs } from './';
import { LIMIT } from './constants';
import s from './styles.module.scss';

const { chatList } = api.chat;

type Props = {
  idChatSelect: string;
  heightHeader: number;
  isModileMode: boolean;
  isVisible: boolean;
  setIdsDialogs: React.Dispatch<React.SetStateAction<number[]>>;
};

const getDialogs = async (limit: number) => {
  try {
    const res = await chatList({
      /* course_id: courseId,
      student_id: studentId, */
      limit,
    });

    return res.data.results;
  } catch (e) {
    console.error(e);
  }
};

export const LeftContent = ({
  idChatSelect,
  heightHeader: heightHeaderProp,
  isModileMode,
  isVisible,
  setIdsDialogs,
}: Props) => {
  const userGroup = useAppSelector(userGroupSelector);
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);
  const [heightHeader, setHeightHeader] = useState(0);
  const [dialogs, setDialogs] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const { message } = useContext(WebsocketMessageContext);

  useEffect(() => {
    const asyncEffect = async () => {
      const limit = 1;
      const results = await getDialogs(limit);

      if (results) {
        const newDialog = results[0];
        setDialogs(state => [newDialog, ...state]);
      }
    };

    if (message) {
      const { type, data } = message;

      if (type === WEBSOCKET_TYPE.newMessage) {
        const { course_id, student_id } = data;

        const index = dialogs.findIndex(
          item => item.course.id === course_id && item.student.id === student_id
        );

        if (typeof index === 'number') {
          const copyDialogs = [...dialogs];
          const newDialog = dialogs[index];
          copyDialogs.splice(index, 1);
          const newDialogs = [newDialog, ...copyDialogs];
          setDialogs(newDialogs);
        } else {
          asyncEffect();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        setIsLoading(true);

        const limit = LIMIT * step; //сделать подгрузку частями
        const results = await getDialogs(limit);
        const idsDialogs = results?.map(({ id }) => id);

        if (results) {
          setDialogs(results);
        }
        if (idsDialogs) {
          setIdsDialogs(state => [...state, ...idsDialogs]);
        }
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [step, userGroup, setIdsDialogs]);

  useEffect(() => {
    const height = ref?.current?.clientHeight;
    if (height) {
      setHeightHeader(height);
    }
  }, [ref]);

  return (
    <div
      className={cn(s.block, {
        [s.block__mobile]: isModileMode,
        [s.block__mobile__isNotVisible]: !isVisible,
      })}
    >
      <Header ref={ref} />
      <ListDialogs
        heightHeader={heightHeader}
        totalHeightHeader={heightHeaderProp}
        dialogs={dialogs}
        idChatSelect={idChatSelect}
        isLoading={isLoading}
        setStep={setStep}
      />
    </div>
  );
};
