import { AppState } from '../types';
import { UserGroup } from './types';

export const userSelector = (state: AppState) => state.user.data;

export const userGroupSelector = (state: AppState) =>
  state.user.data?.groups[0] as UserGroup;

export const userIdSelector = (state: AppState) => state.user.data?.id;
