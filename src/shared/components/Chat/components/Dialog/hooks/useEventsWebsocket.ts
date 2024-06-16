import { useEffect, useContext } from 'react';

import { WebsocketMessageContext } from '../../../../../../contexts';
import { OPTIONS_STATUS } from '../constants';
import { Dialog } from '../types';

type Props = {
  courseId: number;
  studentId: number;
  dialog: Dialog;
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
};

export const useEventsWebsocket = ({
  courseId,
  studentId,
  dialog,
  setDialog,
}: Props) => {
  const { message } = useContext(WebsocketMessageContext);

  useEffect(() => {
    try {
      if (message) {
        const { type } = message;

        if (type === 'new_message') {
          const {
            data: {
              sender_id,
              course_id,
              student_id,
              text,
              created_at,
              message_id,
            },
          } = message;
          const isSuccess = courseId === course_id && studentId === student_id;

          if (isSuccess && message_id && created_at) {
            const newMessage = {
              id: message_id,
              text,
              date: created_at,
              idSender: sender_id,
              task: null,
              attachments: [], //временное решение
            };

            setDialog(state => [newMessage, ...state]);
          }
        } else if (type === 'new_task_result') {
          const {
            data: {
              accepted,
              task_result_id,
              student_id,
              content: { text },
            },
          } = message;
          const isSuccess = studentId === student_id;

          if (isSuccess && task_result_id) {
            const date = dialog[0].date; //временное решение, потому что с бэка не приходит время
            const status = OPTIONS_STATUS[`${accepted}`];

            const newMessage = {
              id: task_result_id,
              text: text as string,
              date,
              idSender: student_id,
              task: { id: task_result_id, status },
              attachments: [], //временное решение
            };

            setDialog(state => [newMessage, ...state]);
          }
        } else if (type === 'new_task_result_decision') {
          const {
            data: { accepted, task_result_id },
          } = message;

          setDialog(state =>
            state.map(item => {
              const { task } = item;

              if (task) {
                const { id } = task;

                if (id === task_result_id) {
                  const status = OPTIONS_STATUS[`${accepted}`];
                  const newItem = {
                    ...item,
                    task: { ...task, status },
                  };

                  return newItem;
                }
              }

              return item;
            })
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
};
