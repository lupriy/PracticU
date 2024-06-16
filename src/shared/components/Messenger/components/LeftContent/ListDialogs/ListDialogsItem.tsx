import React, { forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import {
  MY_STUDENTS_URL_PART,
  MY_MENTORS_URL_PART,
} from '../../../../../constants/paths';
import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../../../../constants/constants';
import { api } from '../../../../../../api';
import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import { QUERY_MESSENGER_CHAT_ID } from '../../../../../constants/queries';
import { disassembleQueryChatId } from '../../../../../utils';
import s from './styles.module.scss';

const { userAvatarRetrieve } = api.user;
const { courseRetrieve } = api.course;

type TProps = {
  id: string;
  name: string;
  profession: string;
  time: string;
  avatar: string;
  newMessages: number;
  message: string;
  isActive: boolean;
};

export const ListDialogsItem = forwardRef(function ListDialogsItem(
  {
    id,
    name,
    profession,
    time,
    //avatar, //ПОДКЛЮЧИТЬ К БЛОКУ, КОГДА БУДЕТ ГОТОВ БЭК, БУДЕТ ИСПОЛЬЗОВАТЬСЯ
    newMessages,
    message,
    isActive,
  }: TProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const navigate = useNavigate();
  const userGroup = useAppSelector(userGroupSelector);

  const [avatar, setAvatar] = useState('');

  const isMentor = userGroup === ID_ROLE_MENTOR;
  const isStudent = userGroup === ID_ROLE_STUDENT;

  //временный кастыль, потом переменная avatar будет приходить из пропсов
  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const { studentId, courseId } = disassembleQueryChatId({ chatId: id });

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
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [id, isMentor, isStudent, userGroup]);
  //

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!isActive) {
      const { id } = e.currentTarget;

      if (isMentor) {
        navigate(`/${MY_STUDENTS_URL_PART}?${QUERY_MESSENGER_CHAT_ID}=${id}`);
      } else if (isStudent) {
        navigate(`/${MY_MENTORS_URL_PART}?${QUERY_MESSENGER_CHAT_ID}=${id}`);
      }
    }
  };

  return (
    <div
      className={cn(s.item, { [s.item__active]: isActive })}
      ref={ref}
      id={id}
      onClick={handleClick}
    >
      <div className={s.row}>
        <div>{profession}</div>
        <div>{time}</div>
      </div>
      <div className={s.rowSecond}>
        <div className={cn(s.avatar, { [s.avatar__active]: !!avatar })}>
          {avatar && <img className={s.img} src={avatar} alt='' />}
        </div>
        <div className={s.content}>
          <div className={s.name}>{name !== ' ' ? name : 'No name'}</div>
          <div className={s.message}>{message}</div>
        </div>
        {!!newMessages && <div className={s.newMessages}>{newMessages}</div>}
      </div>
    </div>
  );
});
