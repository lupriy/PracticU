import { COURSE_FILTERS } from './constants';

export type TagValue =
  | 'popular'
  | 'marketing'
  | 'programming'
  | 'design'
  | 'office'
  | 'softskills';

export type TagLabel = (typeof COURSE_FILTERS)[number];

export type Tag = {
  value: TagValue;
  label: TagLabel;
};

export type HashMapType = {
  [key in TagLabel]: TagValue;
};

export type FiltersHashMap = {
  [key in TagValue]: TagLabel;
};
