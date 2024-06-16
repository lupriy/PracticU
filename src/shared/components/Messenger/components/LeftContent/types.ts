import {
  ID_TYPE_MESSENGER_NOT_VERIFIED,
  ID_TYPE_MESSENGER_ALL,
} from './constants';

export type TypeMessenger =
  | typeof ID_TYPE_MESSENGER_NOT_VERIFIED
  | typeof ID_TYPE_MESSENGER_ALL;

export type TypeListDialogsItem = {
  id: number;
  name: string;
  profession: string;
  time: string;
  avatar: string;
  newMessages: number;
  message: string;
};
