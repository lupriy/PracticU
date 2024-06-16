import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../../../../constants/constants';
import { QUERY_MESSENGER_CHAT_ID } from '../../../../../constants/queries';
import { api } from '../../../../../../api';
import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import { useGetQueryParameter } from '../../../../../hooks';
import { disassembleQueryChatId } from '../../../../../utils';
import { SenderInformations } from '../types';
import s from './styles.module.scss';

const { userAvatarRetrieve } = api.user;
const { courseRetrieve } = api.course;

type Props = {
  informations: SenderInformations;
};

export const Information = ({
  informations: { name, /* avatar, */ course, module },
}: Props) => {
  //временный кастыль, потом переменная avatar будет приходить из пропсов
  const chatId = useGetQueryParameter({ query: QUERY_MESSENGER_CHAT_ID });
  const userGroup = useAppSelector(userGroupSelector);

  const [avatar, setAvatar] = useState('');

  const isMentor = userGroup === ID_ROLE_MENTOR;
  const isStudent = userGroup === ID_ROLE_STUDENT;

  useEffect(() => {
    const asyncEffect = async () => {
      setAvatar('');

      try {
        if (chatId) {
          const { studentId, courseId } = disassembleQueryChatId({ chatId });

          if (isMentor) {
            const res = await userAvatarRetrieve(+studentId);
            const { url } = res;
            setAvatar(url);
          } else if (isStudent) {
            const resCourse = await courseRetrieve(+courseId, {
              group: userGroup,
            });
            const {
              data: {
                mentor: { id },
              },
            } = resCourse;
            const resAvatar = await userAvatarRetrieve(id);
            const { url } = resAvatar;
            setAvatar(url);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [chatId, isMentor, isStudent, userGroup]);
  //

  return (
    <div className={s.information}>
      <div>
        <div className={cn(s.avatar, { [s.avatar__active]: !!avatar })}>
          {avatar && <img className={s.img} src={avatar} alt='' />}
        </div>
      </div>
      <div className={s.block}>
        <div className={s.detailedInformation}>
          <div className={s.name}>{name}</div>
          <div className={s.detailedInformationBlottom}>
            <div>{course}</div>
            {module && (
              <>
                <div className={s.point}>·</div>
                <div>{module}</div>
              </>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
