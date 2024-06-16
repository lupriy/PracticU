import { api } from '../../api';
import { AppDispatch } from '../types';
import { UserGroup } from '../user/types';
import { setData, setError, loading } from './reducer';

export const getUserCoursesThunk =
  (userGroup: UserGroup) => async (dispatch: AppDispatch) => {
    dispatch(loading());
    try {
      const response = await api.course.courseList({ group: userGroup });
      dispatch(setData(response.data));
    } catch (error: any) {
      if (error.message) {
        dispatch(setError(error.message));
        return;
      }
      dispatch(setError(error));
    }
  };
