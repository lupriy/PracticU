import { TagValue } from '../../types';

export type PopupFormState = {
  name?: string;
  desc?: string;
  tags?: string[];
  duration?: number;
  price?: number;
};

export type PopupFormProps = {
  setPopupOpened: (prevState: boolean) => void;
};
