import { createSlice } from '@reduxjs/toolkit';
import {
  SetUserCoursesActionErrorType,
  SetUserCoursesDataActionType,
  userCoursesState,
} from './types';

const initialState: userCoursesState = {
  isLoading: false,
  data: null,
  error: null,
};

const userCoursesSlice = createSlice({
  name: 'userCourses',
  initialState,
  reducers: {
    loading(state: userCoursesState) {
      state.isLoading = true;
    },
    setData(state: userCoursesState, action: SetUserCoursesDataActionType) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setError(state: userCoursesState, action: SetUserCoursesActionErrorType) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userCoursesReducer = userCoursesSlice.reducer;
export const { loading, setData, setError } = userCoursesSlice.actions;
