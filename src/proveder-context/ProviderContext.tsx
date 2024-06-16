import React from 'react';

import { WebsocketProvider } from './providers';

type Props = {
  children: React.ReactChild;
};

export const ProviderContext = ({ children }: Props) => {
  return <WebsocketProvider>{children}</WebsocketProvider>;
};
