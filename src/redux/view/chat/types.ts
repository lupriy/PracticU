import { Message } from '../../../api';

export type ChatState = {
  isShown: boolean;
  unreadMessagesAmount: number;
  interlocutor?: ChatInterlocutor;
  unreadMessages?: Message[];
};

export type SetInterlocutorActionType = {
  payload: ChatInterlocutor;
};

export type SetUnreadMessagesActionType = {
  payload: Message[];
};

export type ChatInterlocutor = {
  id: number;
  name: string;
  surname: string;
  courseName: string;
  courseId: number;
  isStudent: boolean;
};
