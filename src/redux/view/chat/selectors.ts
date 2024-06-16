import { AppState } from '../../types';

export const isChatShownSelector = (state: AppState) => state.view.chat.isShown;
export const chatInterlocutorSelector = (state: AppState) =>
  state.view.chat.interlocutor;
export const chatUnreadMessagesAmountSelector = (state: AppState) =>
  state.view.chat.unreadMessages?.length;
export const chatUnreadMessagesSelector = (state: AppState) =>
  state.view.chat.unreadMessages;
