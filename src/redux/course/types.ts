import { CourseNested } from '../../api';

export type CourseState = {
  isLoading: boolean;
  data: CourseNested | null;
  // TODO: Определить структуру ошибки на сервере (в swagger спецификации и api)
  error: any;
};

export type SetCourseDataActionType = {
  payload: CourseNested;
};

export type SetCourseActionErrorType = {
  payload: any;
};
