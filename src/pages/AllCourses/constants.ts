import { FiltersHashMap } from './types';

export const COURSE_FILTERS = [
  'Популярные',
  'Программирование',
  'Дизайн',
  'Маркетинг',
  'Офис',
  'Cофт скиллы',
] as const;

export const COURSE_TAGS = [
  'popular',
  'programming',
  'design',
  'marketing',
  'office',
  'softskills',
] as const;

export const tagsRUHash: FiltersHashMap = {
  marketing: 'Маркетинг',
  programming: 'Программирование',
  design: 'Дизайн',
  office: 'Офис',
  popular: 'Популярные',
  softskills: 'Cофт скиллы',
};
