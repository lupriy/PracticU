import { combineReducers } from '@reduxjs/toolkit';
import { courseReducer } from './course/reducer';
import { userReducer } from './user/reducer';
import { userCoursesReducer } from './userCourses/reducer';
import { chatReducer } from './view/chat/reducer';
import { coursesListReducer } from './courseList/reducer';
import { userAvatarReducer } from './userAvatar/reducer';
import { courseProgressReducer } from './courseProgress/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userCourses: userCoursesReducer,
  course: courseReducer,
  view: combineReducers({
    chat: chatReducer,
  }),
  coursesList: coursesListReducer,
  userAvatar: userAvatarReducer,
  courseProgress: courseProgressReducer,
});
