import { useState, useEffect } from 'react';

import {
  WebsocketMessageContext,
  ActionsWebsocketMessageContext,
} from '../../../contexts';
import { Events } from 'api/websockets-events';

const TIME = 2000;
const eventsUrl = process.env.REACT_APP_WEBSOCKET_EVENTS_URL ?? '';

type Props = {
  children: React.ReactChild;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<Events | null>(null);
  const [countUpdate, setCountUpdate] = useState(0);

  useEffect(() => {
    let idTimeout: NodeJS.Timeout;

    if (eventsUrl) {
      const socket = new WebSocket(eventsUrl);

      socket.onopen = () => {
        console.log('WebSocket connected');

        if (idTimeout) {
          clearTimeout(idTimeout);
        }
      };

      socket.onmessage = (e: MessageEvent<string>) => {
        try {
          const { data } = e;
          const dataPars: Events = JSON.parse(data);
          setMessage(dataPars);
        } catch (e) {
          console.error(e);
        }
      };

      socket.onerror = e => {
        console.error(e);
      };

      socket.close = () => {
        console.log('close');
        idTimeout = setTimeout(() => setCountUpdate(state => ++state), TIME);
      };

      return () => {
        socket.close();

        if (idTimeout) {
          clearTimeout(idTimeout);
        }
      };
    } else {
      idTimeout = setTimeout(() => setCountUpdate(state => ++state), TIME);

      return () => {
        if (idTimeout) {
          clearTimeout(idTimeout);
        }
      };
    }
  }, [countUpdate]);

  return (
    <WebsocketMessageContext.Provider value={{ message }}>
      <ActionsWebsocketMessageContext.Provider value={{ setMessage }}>
        {children}
      </ActionsWebsocketMessageContext.Provider>
    </WebsocketMessageContext.Provider>
  );
};
