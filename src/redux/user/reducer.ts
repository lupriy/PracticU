import { createSlice } from '@reduxjs/toolkit';
import { FIRST_LESSON_POSITION } from './constants';
import {
  SetUserActionErrorType,
  SetUserDataActionType,
  SetNextPageInLesson,
  userState,
} from './types';

const initialState: userState = {
  isLoading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loading(state: userState) {
      state.isLoading = true;
    },
    setData(state: userState, action: SetUserDataActionType) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setError(state: userState, action: SetUserActionErrorType) {
      state.isLoading = false;
      state.error = action.payload;
    },
    unlockNextLesson(state: userState, action: SetNextPageInLesson) {
      if (state.data?.active_course?.lesson.position) {
        state.data.active_course.lesson.position = action.payload + 1;
      }
    },
    unlockNextModule(state: userState) {
      if (state.data?.active_course?.module.position) {
        state.data.active_course.lesson.position = FIRST_LESSON_POSITION;
        state.data.active_course.module.position++;
      }
    },
    changeUserSelectedCourse(state: userState, action) {
      const activeCourse = state.data?.active_course;

      if (activeCourse) {
        activeCourse.course = action.payload;
      }
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  loading,
  setData,
  setError,
  unlockNextLesson,
  unlockNextModule,
  changeUserSelectedCourse,
} = userSlice.actions;
