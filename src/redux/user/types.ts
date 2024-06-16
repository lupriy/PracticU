import { UserFull } from '../../api';

export type userState = {
  isLoading: boolean;
  data: UserFull | null;
  // TODO: Определить структуру ошибки на сервере (в swagger спецификации и api)
  error: any;
};

export type SetUserDataActionType = {
  payload: UserFull;
};

export type SetUserActionErrorType = {
  payload: any;
};

export type SetNextPageInLesson = {
  payload: number;
};

export type UserGroup = 'mentor' | 'student' | 'manager' | undefined;
