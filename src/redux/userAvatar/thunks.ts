import { api } from '../../api';
import { AppDispatch } from '../types';
import { loading, setData, setError } from './reducer';

//TODO: временное решение, надо будет описывать типы и убирать ts-ignore
//@ts-ignore
const saveError = (dispatch, error) => {
  const { message } = error;
  if (message) {
    dispatch(setError(message));
  } else {
    dispatch(setError(error));
  }
};

export const getUserAvatarThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loading());
  try {
    const response = await api.me.meAvatarRetrieve();
    const { url } = response;
    dispatch(setData(url));
  } catch (error: any) {
    // saveError(dispatch, error);
  }
};

//TODO: временное решение, надо будет описывать типы и убирать ts-ignore
//@ts-ignore
export const postUserAvatar = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(loading());
  try {
    const response = await api.me.meAvatarCreate(data);
    const { url } = response;
    dispatch(setData(url));
  } catch (error: any) {
    saveError(dispatch, error);
  }
};

export const deleteUserAvatar = () => async (dispatch: AppDispatch) => {
  dispatch(loading());
  try {
    await api.me.meAvatarDestroy();
    dispatch(setData(''));
  } catch (error: any) {
    saveError(dispatch, error);
  }
};
