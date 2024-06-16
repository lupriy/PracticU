import { api } from '../../api';
import { AppDispatch } from '../types';
import { setData, setError, loading } from './reducer';

export const getUserThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loading());
  try {
    const response = await api.me.meRetrieve();
    dispatch(setData(response.data));
  } catch (error: any) {
    if (error.message) {
      dispatch(setError(error.message));
      return;
    }
    dispatch(setError(error));
  }
};
