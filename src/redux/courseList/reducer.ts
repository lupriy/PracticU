import { createSlice } from '@reduxjs/toolkit';
import {
  SetCoursesListActionErrorType,
  SetCoursesListDataActionType,
  CoursesListState,
} from './types';

const initialState: CoursesListState = {
  isLoading: false,
  data: null,
  error: null,
};

const coursesListSlice = createSlice({
  name: 'coursesList',
  initialState,
  reducers: {
    loading(state: CoursesListState) {
      state.isLoading = true;
    },
    setData(state: CoursesListState, action: SetCoursesListDataActionType) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setError(state: CoursesListState, action: SetCoursesListActionErrorType) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const coursesListReducer = coursesListSlice.reducer;
export const { loading, setData, setError } = coursesListSlice.actions;
