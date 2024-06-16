import { AppState } from '../types';
//import { TagValue } from "./types";

export const coursesListSelector = (state: AppState) => state.coursesList.data;

export const coursesByTagSelector = (state: AppState, tag: string) => {
  const courses = state.coursesList.data?.results ?? [];
  const coursesLength = courses.length;

  if (!tag) {
    return courses;
  } else if (coursesLength > 1) {
    const courseFilter = state.coursesList.data?.results?.filter(course =>
      course.tags.includes(tag)
    );
    const result = courseFilter ?? [];

    return result;
  }

  return [];
};
