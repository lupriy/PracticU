import { PaginatedCourseList } from '../../api';

export type userCoursesState = {
  isLoading: boolean;
  data: PaginatedCourseList | null;
  // TODO: Определить структуру ошибки на сервере (в swagger спецификации и api)
  error: any;
};

export type SetUserCoursesDataActionType = {
  payload: PaginatedCourseList;
};

export type SetUserCoursesActionErrorType = {
  payload: any;
};
