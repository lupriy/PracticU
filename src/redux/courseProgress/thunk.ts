import { api } from '../../api';
import { AppDispatch } from '../types';
import { setData, setError, loading } from './reducer';

export const getCourseProgress =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(loading());
    try {
      const response = await api.course.courseProgressRetrieve(id);
      dispatch(setData(response.data));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };
