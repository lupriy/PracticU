//удалить файл

import { createSlice } from '@reduxjs/toolkit';
import {
  ChatState,
  SetInterlocutorActionType,
  SetUnreadMessagesActionType,
} from './types';

const initialState: ChatState = {
  isShown: false,
  interlocutor: undefined,
  unreadMessagesAmount: 0,
  unreadMessages: [],
};

/* TODO: Разделить на model и view? Сейчас все вместе лежит */

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChatModal(state: ChatState) {
      state.isShown = true;
    },
    closeChatModal(state: ChatState) {
      state.isShown = false;
    },
    setInterlocutor(state: ChatState, action: SetInterlocutorActionType) {
      state.interlocutor = action.payload;
    },
    setUnreadMessages(state: ChatState, action: SetUnreadMessagesActionType) {
      state.unreadMessages = action.payload;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  openChatModal,
  closeChatModal,
  setInterlocutor,
  setUnreadMessages,
} = chatSlice.actions;
