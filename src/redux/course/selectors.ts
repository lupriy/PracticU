import { AppState } from '../types';

export const courseModulesSelector = (state: AppState) =>
  state.course.data?.modules;

export const activeModuleLengthSelector = (
  state: AppState,
  moduleId: number | undefined
) => {
  if (moduleId) {
    const module = state.course.data?.modules?.find(
      module => module.id === moduleId
    );

    return module?.lessons.length;
  }
};

export const courseSelector = (state: AppState) => state.course.data;

export const courseTagSelector = (state: AppState) =>
  state.course.data?.tags[0] ?? '';
