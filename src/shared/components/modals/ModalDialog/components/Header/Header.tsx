import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { api } from '../../../../../../api';
import s from './styles.module.scss';

const { userAvatarRetrieve } = api.user;
const { userRetrieve } = api.user;

type Props = {
  mentorId: number;
  courseName: string;
};

export const Header = ({ mentorId, courseName }: Props) => {
  const [mentorName, setMentorName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const {
          data: { first_name, last_name },
        } = await userRetrieve(mentorId);
        const res = await userAvatarRetrieve(+mentorId);

        const name = `${first_name} ${last_name}`;
        const { url } = res;

        setMentorName(name);
        setAvatar(url);
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [mentorId]);

  return (
    <div className={s.block}>
      <div className={cn(s.avatar, { [s.avatar__active]: !!avatar })}>
        {avatar && <img className={s.img} src={avatar} alt='' />}
      </div>
      <div>
        <div className={s.mentorName}>{mentorName}</div>
        <div className={s.courseName}>{courseName}</div>
      </div>
    </div>
  );
};
