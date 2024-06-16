import { ActiveStudentCourse } from '../../api';

export type CourseProgressState = {
  isLoading: boolean;
  data: ActiveStudentCourse | null;
  // TODO: Определить структуру ошибки на сервере (в swagger спецификации и api)
  error: any;
};

export type SetCourseProgressDataActionType = {
  payload: ActiveStudentCourse;
};

export type SetCourseProgressActionErrorType = {
  payload: any;
};
