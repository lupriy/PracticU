import React, { useMemo, Fragment, useState, useEffect, useRef } from 'react';

import { useAppSelector } from '../../../../../redux/hooks';
import { userSelector } from '../../../../../redux/user/selectors';
import { PanelDate } from './PanelDate';
import { DialogItem } from './DialogItem';
import { PANEL_CONTENT, DEFAULT_ITEM, OPTIONS_MONTH } from './constants';
import { Dialog as TDialog } from './types';
import { useSetDialogData, useEventsWebsocket } from './hooks';
import s from './styles.module.scss';

type Props = {
  chatId: number;
  courseId: number;
  studentId: number;
  heightDialog: number;
};

export const Dialog = ({
  chatId,
  courseId,
  studentId,
  heightDialog,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dialog, setDialog] = useState<TDialog>([]);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(userSelector);
  const { id: idUser } = user || { id: 0 };

  useSetDialogData({
    step,
    chatId,
    setDialog,
    setIsLoading,
  });
  useEventsWebsocket({ courseId, studentId, dialog, setDialog });

  useEffect(() => {
    setDialog([]);
    setStep(1);
  }, [courseId, studentId]);

  const [dayToday, yearToday] = useMemo(() => {
    const jsDate = new Date();
    const day = jsDate.getDate();
    const year = jsDate.getFullYear();

    return [day, year];
  }, []);

  const handleScroll = () => {
    if (ref.current) {
      const { top, bottom } = ref.current?.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom >= 0;
      if (isVisible && !isLoading) {
        setStep(state => ++state);
      }
    }
  };

  const displayContent = useMemo(() => {
    const dialogReverse = [...dialog];
    dialogReverse.reverse();

    const result = dialogReverse.map((item, index, arr) => {
      const { id, date, text, idSender, task, attachments } = item;
      const numberItem = index + 1;

      const isRight = idSender === idUser;

      const jsDate = new Date(date);
      const minutes = jsDate.getMinutes();
      const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
      const hours = jsDate.getHours();
      const hoursFormat = hours < 10 ? `0${hours}` : hours;
      const day = jsDate.getDate();
      const month = jsDate.getMonth() + 1;
      const nameMonth = OPTIONS_MONTH[month];
      const year = jsDate.getFullYear();
      const testDateFormar = `${day}${month}${year}`;

      const previousItem = arr[index - 1] || DEFAULT_ITEM;
      const { date: datePreviousItem } = previousItem;
      const jsDatePreviousItem = new Date(datePreviousItem);
      const dayPreviousItem = jsDatePreviousItem.getDate();
      const monthPreviousItem = jsDatePreviousItem.getMonth() + 1;
      const yearPreviousItem = jsDatePreviousItem.getFullYear();
      const testDateFormarPreviousItem = `${dayPreviousItem}${monthPreviousItem}${yearPreviousItem}`;

      const isMatch = testDateFormar === testDateFormarPreviousItem;
      let panelContent = '';

      if (!isMatch) {
        if (day === dayToday) {
          panelContent = PANEL_CONTENT.Today;
        } else if (day === dayToday - 1) {
          panelContent = PANEL_CONTENT.Yesterday;
        } else if (year !== yearToday) {
          const fullDate = `${day} ${nameMonth} ${year}`;
          panelContent = fullDate;
        } else {
          const fullDate = `${day} ${nameMonth}`;
          panelContent = fullDate;
        }
      }

      const time = `${hoursFormat}:${minutesFormat}`;

      const isHaveTask = !!task;
      const uniqueId = isHaveTask ? `task_${id}` : `${id}`;

      //определение элемента, когда который попадает в поле вдимости, начинает загрузку новой порции сообщений
      const isNecessaryItem = numberItem === 2;

      return isNecessaryItem ? (
        <div ref={ref} key={uniqueId}>
          {panelContent && <PanelDate text={panelContent} />}
          <DialogItem
            id={uniqueId}
            messangeId={id}
            time={time}
            text={text}
            isRight={isRight}
            task={task}
            attachments={attachments}
          />
        </div>
      ) : (
        <Fragment key={uniqueId}>
          {panelContent && <PanelDate text={panelContent} />}
          <DialogItem
            id={uniqueId}
            messangeId={id}
            time={time}
            text={text}
            isRight={isRight}
            task={task}
            attachments={attachments}
          />
        </Fragment>
      );
    });

    return result;
  }, [dialog, idUser, dayToday, yearToday]);

  return (
    <div
      className={s.block}
      style={{ height: heightDialog }}
      onScroll={handleScroll}
    >
      <div className={s.content}>{displayContent}</div>
    </div>
  );
};
