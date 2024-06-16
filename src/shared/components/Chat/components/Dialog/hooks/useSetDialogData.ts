import { useEffect } from 'react';

import { api } from '../../../../../../api';
import { Dialog } from '../types';
import { OPTIONS_STATUS, LIMIT } from '../constants';

const { chatRetrieve } = api.chat;

type Params = {
  step: number;
  chatId: number;
  setDialog: React.Dispatch<React.SetStateAction<Dialog>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSetDialogData = ({
  step,
  chatId,
  setDialog,
  setIsLoading,
}: Params) => {
  useEffect(() => {
    let isCancelled = false;

    const asyncEffect = async () => {
      try {
        setIsLoading(true);

        const res = await chatRetrieve(chatId, {
          limit: LIMIT * step, //сделать подгрузку частями
        });
        const { data } = res;

        const dialog = data.map(item => {
          //нужен потому что тс тупит и ругается
          //@ts-ignore
          const { type, data } = item;

          if (type === 'message') {
            const {
              id,
              //нужен потому что тс тупит и ругается
              //@ts-ignore
              updated_at,
              //нужен потому что тс тупит и ругается
              //@ts-ignore
              text,
              //нужен потому что тс тупит и ругается
              //@ts-ignore
              sender: { id: idSender },
              attachments,
            } = data;
            const task = null as null;

            const message = {
              id,
              date: updated_at,
              text,
              idSender,
              task,
              attachments,
            };

            return message;
          } else if (type === 'task_result') {
            const {
              id,
              created_at,
              /* text, */ //ожидается, что это будет приходить с бэка
              student: { id: idSender },
              //нужен потому что тс тупит и ругается
              //@ts-ignore
              accepted,
              attachments,
            } = data;

            const taskStatus = OPTIONS_STATUS[`${accepted}`];
            const message = {
              id,
              date: created_at,
              text: '',
              idSender,
              task: { status: taskStatus, id },
              attachments,
            };

            return message;
          }

          return null;
        });

        const dialogFilter = dialog.filter(item => item);

        if (!isCancelled) {
          //@ts-ignore
          setDialog(dialogFilter);
        }
        //setDialog(state => [...state, ...dialog]); //когда будет подгрузка чата кусками это будет использоваться
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    asyncEffect();

    return () => {
      isCancelled = true;
    };
  }, [step, chatId, setDialog, setIsLoading]);
};
