//УДАЛИТЬ

import cn from 'classnames';
import { StudentTaskResultCardProps } from './types';
import {
  openChatModal,
  setInterlocutor,
} from '../../../../redux/view/chat/reducer';
import { useAppDispatch } from '../../../../redux/hooks';
import styles from './styles.module.scss';

export const StudentTaskResultCard = ({
  courseId,
  studentId,
  isActiveFirstTab,
  isActiveSecondTab,
  matchesMobile,
  matchesTablet,
  firstName,
  lastName,
  courseName,
  position,
  createdAt,
  onClick,
}: StudentTaskResultCardProps) => {
  const dispatch = useAppDispatch();

  const handleChatClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent handleOpenModal
    event.stopPropagation();

    dispatch(
      setInterlocutor({
        id: studentId,
        name: firstName,
        surname: lastName,
        courseName,
        courseId,
        isStudent: true,
      })
    );
    dispatch(openChatModal());
  };

  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div
      className={cn(styles.card, {
        [styles['card-small']]: isActiveSecondTab,
        [styles['card-mobile']]: matchesMobile && !matchesTablet,
      })}
      onClick={onClick}
    >
      {isActiveFirstTab && (
        <div
          className={cn(styles.status, 'size-xxs')}
          onClick={handleChatClick}
        >
          Чат
        </div>
      )}
      <p className={cn(styles.name, 'size-s')}>{`${firstName} ${lastName}`}</p>
      <p
        className={cn(styles.description, 'size-s')}
      >{`${courseName} • мод ${position}`}</p>
      {/* {isActiveFirstTab && (
        <p className={cn(styles.answer, "size-xs")}>{studentTaskText}</p>
      )} */}
      {isActiveFirstTab && (
        <p className={cn(styles.description, styles.date, 'size-s')}>{date}</p>
      )}
    </div>
  );
};
