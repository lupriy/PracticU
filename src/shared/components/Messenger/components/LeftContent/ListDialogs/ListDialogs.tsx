import React, { useMemo, useRef } from 'react';
import { useWindowSize } from 'react-use';

import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../../../../constants/constants';
import { createQueryChatId, formatTime } from '../../../../../utils';
import { Chat } from '../../../../../../api';
import { ListDialogsItem } from './ListDialogsItem';
import s from './styles.module.scss';

type TProps = {
  heightHeader: number;
  totalHeightHeader: number;
  dialogs: Chat[];
  idChatSelect: string;
  isLoading: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const ListDialogs = ({
  heightHeader,
  totalHeightHeader,
  dialogs,
  idChatSelect,
  isLoading,
  setStep,
}: TProps) => {
  const userGroup = useAppSelector(userGroupSelector);
  const { height: heightWindow } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current) {
      const { top, bottom } = ref.current?.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom >= 0;
      if (isVisible && !isLoading) {
        setStep(state => ++state);
      }
    }
  };

  const dialogsLength = dialogs.length;

  const display = useMemo(
    () =>
      dialogs.map((item, index) => {
        console.log(item);
        const {
          id: chatId,
          //@ts-ignore
          last_message,
          student: {
            first_name: firstNameStudent,
            last_name: lastNameStudent,
            id: studentId,
          },
          mentor: {
            first_name: firstNameMentor,
            last_name: lastNameMentor,
            //id: studentIdMentor,
          },
          course: { name: courseName, id: courseId },
        } = item;

        let text = '';
        let updated_at = '';

        if (last_message?.type === 'message') {
          text = last_message?.data.text;
          updated_at = last_message?.data.updated_at;
        } else if (last_message?.type === 'task_result') {
          text = '(Задание)';
          updated_at = last_message?.data.created_at;
        }

        let name = '';
        if (userGroup === ID_ROLE_MENTOR) {
          name = `${firstNameStudent || ''} ${lastNameStudent || ''}`;
        } else if (userGroup === ID_ROLE_STUDENT) {
          name = `${firstNameMentor || ''} ${lastNameMentor || ''}`;
        }
        const AVATAR = ''; //временно
        const NEW_MESSAGES = 0; //временно

        let time = '';

        if (updated_at) {
          const { time: timeRes } = formatTime({ date: updated_at });
          time = timeRes;
        } else {
          time = 'Новый чат';
        }
        const { id } = createQueryChatId({ courseId, studentId, chatId });
        const isActive = id === idChatSelect;

        const numberItem = index + 1;
        const lastItem = numberItem === dialogsLength;
        const refProp = lastItem ? ref : null;

        return (
          <ListDialogsItem
            key={id}
            ref={refProp}
            id={id}
            name={name}
            profession={courseName}
            time={time}
            avatar={AVATAR}
            newMessages={NEW_MESSAGES}
            message={text}
            isActive={isActive}
          />
        );
      }),
    [dialogs, idChatSelect, dialogsLength, userGroup]
  );

  const height = heightWindow - heightHeader - totalHeightHeader;

  return (
    <div className={s.block} style={{ height }} onScroll={handleScroll}>
      {display}
    </div>
  );
};
