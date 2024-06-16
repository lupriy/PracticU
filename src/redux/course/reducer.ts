import { createSlice } from '@reduxjs/toolkit';
import {
  SetCourseActionErrorType,
  SetCourseDataActionType,
  CourseState,
} from './types';

const initialState: CourseState = {
  isLoading: false,
  data: null,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    loading(state: CourseState) {
      state.isLoading = true;
    },
    setData(state: CourseState, action: SetCourseDataActionType) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setError(state: CourseState, action: SetCourseActionErrorType) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const courseReducer = courseSlice.reducer;
export const { loading, setData, setError } = courseSlice.actions;
