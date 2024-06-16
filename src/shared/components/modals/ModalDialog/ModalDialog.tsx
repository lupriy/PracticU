import React, { useEffect, useState } from 'react';

import { api } from 'api';
import { useAppSelector } from '../../../../redux/hooks';
import { userSelector } from '../../../../redux/user/selectors';
import { Header, Content } from './components';
import { ModalContainet } from '../';
import s from './styles.module.scss';

const { chatList } = api.chat;

type Props = {
  mentorId: number;
  courseId: number;
  courseName: string;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalDialog = ({
  mentorId,
  courseId,
  courseName,
  setIsVisible,
}: Props) => {
  const user = useAppSelector(userSelector);
  const [chatId, setChatId] = useState(0);

  const studentId = user?.id ?? 0;

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const res = await chatList({
          student_id: studentId,
          lesson__module__course_id: courseId,
        });

        const id = res.data.results?.[0].id;

        if (id) {
          setChatId(id);
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [studentId, courseId]);

  return (
    <ModalContainet setIsVisible={setIsVisible}>
      <div className={s.container}>
        <Header mentorId={mentorId} courseName={courseName} />
        <Content
          chatId={chatId}
          studentId={studentId}
          courseId={courseId}
          mentorId={mentorId}
        />
      </div>
    </ModalContainet>
  );
};
