import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const userAvatarSlice = createSlice({
  name: 'userAvatar',
  initialState,
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    setData(state, action) {
      state.isLoading = false;
      state.data = action?.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action?.payload;
    },
  },
});

export const userAvatarReducer = userAvatarSlice.reducer;
export const { loading, setData, setError } = userAvatarSlice.actions;
