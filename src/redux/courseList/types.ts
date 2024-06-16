import { PaginatedCourseList } from '../../api';

export type CoursesListState = {
  isLoading: boolean;
  data: PaginatedCourseList | null;
  error: any;
};

export type SetCoursesListDataActionType = {
  payload: PaginatedCourseList;
};

export type SetCoursesListActionErrorType = {
  payload: any;
};

export type TagValue =
  | 'popular'
  | 'marketing'
  | 'programming'
  | 'design'
  | 'office';
