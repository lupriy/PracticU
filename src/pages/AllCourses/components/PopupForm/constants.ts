import { Tag } from '../../types';
import { PopupFormState } from './types';

export const tags: Tag[] = [
  {
    value: 'marketing',
    label: 'Маркетинг',
  },
  {
    value: 'programming',
    label: 'Программирование',
  },
  {
    value: 'design',
    label: 'Дизайн',
  },
  {
    value: 'office',
    label: 'Офис',
  },
  {
    value: 'popular',
    label: 'Популярные',
  },
];

export const initialState: PopupFormState = {
  name: '',
  desc: '',
  tags: [],
  duration: 0,
  price: 0,
};
