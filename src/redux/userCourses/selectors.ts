import { AppState } from '../types';

export const userCoursesSelector = (state: AppState) => state.userCourses.data;
