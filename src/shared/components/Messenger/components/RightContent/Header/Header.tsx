import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../../../../constants/constants';
import { api } from '../../../../../../api';
import { disassembleQueryChatId } from '../../../../../utils';
import { Information } from './Information';
import { ButtonBack } from './ButtonBack';
import { SenderInformations } from '../types';
import { DEFAULT_INFORMATIONS } from './constants';
import s from './styles.module.scss';

const { chatList } = api.chat;

type TProps = {
  idChatSelect: string;
  isSelect: boolean;
  isModileMode: boolean;
  setIdRecipient: React.Dispatch<React.SetStateAction<number>>;
};

export const Header = forwardRef(
  (
    { idChatSelect, isSelect, isModileMode, setIdRecipient }: TProps,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const userGroup = useAppSelector(userGroupSelector);
    const [informations, setInformations] =
      useState<SenderInformations>(DEFAULT_INFORMATIONS);

    const { courseId, studentId } = useMemo(
      () =>
        disassembleQueryChatId({
          chatId: idChatSelect,
        }),
      [idChatSelect]
    );

    useEffect(() => {
      setInformations(DEFAULT_INFORMATIONS);
    }, [idChatSelect]);

    useEffect(() => {
      let isCancelled = false;

      const asyncEffect = async () => {
        try {
          const res = await chatList({
            lesson__module__course_id: +courseId,
            student_id: +studentId,
            limit: 1,
          });
          const chatItem = res.data.results?.[0];

          if (!chatItem) {
            return;
          }

          const {
            course: { name: courseName },
            student,
            mentor,
          } = chatItem;
          let id = 0;
          let informations: SenderInformations | null = null;

          if (userGroup === ID_ROLE_MENTOR) {
            const { first_name, last_name, id: studentId } = student;

            const name = `${first_name} ${last_name}`;

            id = studentId;
            informations = {
              name,
              avatar: '',
              course: courseName,
              module: '',
            };
          } else if (userGroup === ID_ROLE_STUDENT) {
            const { first_name, last_name, id: mentorId } = mentor;

            const name = `${first_name} ${last_name}`;

            id = mentorId;
            informations = {
              name,
              avatar: '',
              course: courseName,
              module: '',
            };
          }

          if (!isCancelled && informations && id) {
            setIdRecipient(id);
            setInformations(informations);
          }
        } catch (e) {
          console.error(e);
        }
      };

      asyncEffect();

      return () => {
        isCancelled = true;
      };
    }, [courseId, studentId, userGroup, setIdRecipient]);

    return (
      <div
        ref={ref}
        className={cn(s.block, { [s.block__modile]: isModileMode })}
      >
        {isSelect && <ButtonBack />}
        {isSelect && <Information informations={informations} />}
      </div>
    );
  }
);
