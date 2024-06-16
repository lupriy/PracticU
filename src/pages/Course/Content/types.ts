import { CourseNested } from '../../../api';

export type ContentProps = {
  course: CourseNested;
  moduleId: number;
  lessonId: number;
};

export type ContentComponentsData =
  | VideoComponentData
  | TestRadioComponentData
  | TestTextareaComponentData
  | ImageComponentData;

export type VideoComponentData = {
  source: string;
};

export type TestRadioComponentData = {
  title?: string;
  options: string[];
};

export type TestTextareaComponentData = {
  title?: string;
  text: string[];
};

export type ImageComponentData = {
  src: string;
  alt?: string;
};
