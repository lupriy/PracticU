import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from '../../../../api';
import { Content } from './Content';
import { useAppSelector } from '../../../../redux/hooks';
import { userSelector } from '../../../../redux/user/selectors';
import {
  MY_STUDENTS_URL_PART,
  MY_MENTORS_URL_PART,
} from '../../../constants/paths';
import { StateMessageInfo, ParamsAsyncEffect } from './types';
import { WebsocketMessageContext } from '../../../../contexts';

const { userRetrieve /* userAvatarRetrieve */ } = api.user;

export const NotificationNewMessage = () => {
  const { message } = useContext(WebsocketMessageContext);
  const user = useAppSelector(userSelector);
  const location = useLocation();
  const [messageInfo, setMessageInfo] = useState<StateMessageInfo>(null);
  const [isAllowedPage, setIsAllowedPage] = useState(false);

  const userId = user?.id;

  const asyncEffect = useCallback(
    async ({ id, text, date }: ParamsAsyncEffect) => {
      try {
        const {
          data: { first_name, last_name },
        } = await userRetrieve(id);

        const name = `${first_name} ${last_name}`;
        const avatar = '';

        const messageInfo = {
          name,
          text,
          date,
          avatar,
        };
        setMessageInfo(messageInfo);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  useEffect(() => {
    try {
      if (message) {
        const { type } = message;

        if (type === 'new_message') {
          setMessageInfo(null);
          const {
            data: { sender_id, text, created_at },
          } = message;

          if (userId !== sender_id) {
            asyncEffect({
              id: sender_id,
              text,
              date: created_at ?? '',
            });
          }
        }
      }
      // в будущем будет юзаться
      /* else if (type === 'new_task_result') {
      }  else if (type === 'new_task_result_decision') {
      } */
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    try {
      const { pathname } = location;

      if (
        pathname === `/${MY_STUDENTS_URL_PART}` ||
        pathname === `/${MY_MENTORS_URL_PART}`
      ) {
        setIsAllowedPage(false);
      } else {
        setIsAllowedPage(true);
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const isVisibleContent = messageInfo && isAllowedPage;

  return (
    <>
      {isVisibleContent && (
        <Content {...messageInfo} setMessageInfo={setMessageInfo} />
      )}
    </>
  );
};
