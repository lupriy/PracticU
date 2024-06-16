import { AppState } from 'redux/types';

export const courseProgressSelector = (state: AppState) =>
  state.courseProgress?.data;
