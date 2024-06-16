import { AppState } from '../types';

export const userAvatarSelector = (state: AppState) => state.userAvatar?.data;
