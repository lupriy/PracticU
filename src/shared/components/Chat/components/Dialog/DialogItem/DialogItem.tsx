import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import { api } from '../../../../../../api';
import { StatusLine, BottomBlock, ButtonOpenFullText, Attachments } from './';
import { Message } from '../types';
import { TaskInformation } from './types';
import s from './styles.module.scss';

const { taskResultRetrieve } = api.taskResult;
const MAX_LENGTH_TEXT = 2000;

type Props = {
  id: string;
  messangeId: number;
  time: string;
  text: string;
  isRight: boolean;
  task: Message['task'];
  attachments: Message['attachments'];
};

export const DialogItem = ({
  id,
  messangeId,
  time,
  text: textProp,
  isRight,
  task,
  attachments,
}: Props) => {
  const userGroup = useAppSelector(userGroupSelector);

  const [text, setText] = useState(textProp);
  const [sliceText, setSliceText] = useState('');
  const [isLongText, setIsLongText] = useState(false);
  const [isOpenFullText, setIsOpenFullText] = useState(false);
  const [taskInformation, setTaskInformation] = useState<TaskInformation>({
    courseName: '',
    modulePosition: 0,
    lessonPosition: 0,
  });

  useEffect(() => {
    let isCancelled = false;

    const asyncEffect = async () => {
      try {
        if (task) {
          const { id } = task;
          const {
            data: {
              content,
              task: {
                course: { name: courseName },
                module: { position: modulePosition },
                lesson: { position: lessonPosition },
              },
            },
          } = await taskResultRetrieve(id, { group: userGroup });
          const contentPars = JSON.parse(content);
          const { text } = contentPars;
          const textLengt = text.length;
          const isLong = textLengt > MAX_LENGTH_TEXT;

          if (!isCancelled) {
            setText(text);
            setTaskInformation({ courseName, modulePosition, lessonPosition });

            if (isLong) {
              const sliceText = text.substring(0, MAX_LENGTH_TEXT);
              const str = `${sliceText}...`;
              setSliceText(str);
              setIsLongText(true);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (task) {
      asyncEffect();
    }

    return () => {
      isCancelled = true;
    };
  }, [task, userGroup]);

  const realText = useMemo(() => {
    if (task && isLongText) {
      if (isOpenFullText) {
        return text;
      } else {
        return sliceText;
      }
    } else {
      return text;
    }
  }, [task, text, sliceText, isLongText, isOpenFullText]);

  return (
    <div className={cn(s.block, { [s.block__right]: isRight })} id={id}>
      <div>
        <div className={s.message}>
          <div className={s.text}>{realText}</div>
          <Attachments
            messangeId={messangeId}
            attachments={attachments}
            isTask={!!task}
            isRight={isRight}
          />
          <div className={s.time}>{time}</div>
          {task && <StatusLine status={task.status} />}
          {isLongText && (
            <ButtonOpenFullText
              isOpenFullText={isOpenFullText}
              setIsOpenFullText={setIsOpenFullText}
            />
          )}
        </div>
        {task && (
          <BottomBlock
            status={task.status}
            id={task.id}
            isRight={isRight}
            taskInformation={taskInformation}
          />
        )}
      </div>
    </div>
  );
};
