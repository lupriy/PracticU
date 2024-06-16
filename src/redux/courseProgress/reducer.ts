import { createSlice } from '@reduxjs/toolkit';
import {
  CourseProgressState,
  SetCourseProgressActionErrorType,
  SetCourseProgressDataActionType,
} from './types';

const initialState: CourseProgressState = {
  isLoading: false,
  data: null,
  error: null,
};

const courseProgressSlice = createSlice({
  name: 'courseProgress',
  initialState,
  reducers: {
    loading(state: CourseProgressState) {
      state.isLoading = true;
    },
    setData(
      state: CourseProgressState,
      action: SetCourseProgressDataActionType
    ) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setError(
      state: CourseProgressState,
      action: SetCourseProgressActionErrorType
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const courseProgressReducer = courseProgressSlice.reducer;
export const { loading, setData, setError } = courseProgressSlice.actions;
