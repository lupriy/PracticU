import { TagValue, TagLabel } from '../../types';
import { Course, User } from '../../../../api';

export type CourseCardProps = {
  id: number;
  tag: TagValue;
  duration: number;
  price: number;
  title: string;
  desc: string;
  className: string;
  mentor: User;
  setDeleteItems: React.Dispatch<React.SetStateAction<[] | number[]>>;
  setChangedItem: React.Dispatch<React.SetStateAction<Course | null>>;
  setIsOpen: (state: boolean) => void;
};

export type BgHashMap = {
  [key in TagValue]?: JSX.Element;
};

export type FiltersHashMap = {
  [key in TagValue]: TagLabel;
};
