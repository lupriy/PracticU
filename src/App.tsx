import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material';

import { store } from './redux/store';
import { auth as user } from './api/Auth';
import {
  AllCourses,
  AuthPage,
  MainPage,
  Course,
  Modules,
  Lessons,
  LessonsChange,
  MyStudents,
  MyMentors,
  Profile,
} from './pages';
import { ScrollToTop, NotificationNewMessage } from './shared/components';
import {
  MY_MENTORS_URL_PART,
  COURSES_URL_PART,
  MY_STUDENTS_URL_PART,
  PROFILE_URL_PART,
} from './shared/constants/paths';
import { ProviderContext } from './proveder-context';

export const App = () => {
  const loggedIn = user.isAuthenticated();

  return (
    <Provider store={store}>
      <ProviderContext>
        <StyledEngineProvider injectFirst>
          <Router>
            <ScrollToTop />
            <NotificationNewMessage />
            <Routes>
              {!loggedIn && <Route path='login' element={<AuthPage />} />}
              {loggedIn && (
                <>
                  <Route path='/' element={<MainPage />} />
                  <Route
                    path={`${COURSES_URL_PART}/:courseName`}
                    element={<Course />}
                  >
                    <Route path='module-:moduleId' element={<Outlet />}>
                      <Route path='lesson-:lessonId' element={<Outlet />} />
                    </Route>
                  </Route>
                  <Route
                    path={`${COURSES_URL_PART}/all`}
                    element={<AllCourses />}
                  />
                  <Route
                    path={`${COURSES_URL_PART}/all/modules`}
                    element={<Modules />}
                  />
                  <Route
                    path={`${COURSES_URL_PART}/all/modules/lessons`}
                    element={<Lessons />}
                  />
                  <Route
                    path={`${COURSES_URL_PART}/all/modules/lessons/change`}
                    element={<LessonsChange />}
                  />
                  <Route path={MY_STUDENTS_URL_PART} element={<MyStudents />} />
                  <Route path={MY_MENTORS_URL_PART} element={<MyMentors />} />
                  <Route path={PROFILE_URL_PART} element={<Profile />} />
                </>
              )}
              <Route
                path='*'
                element={<Navigate to={loggedIn ? '/' : '/login'} />}
              />
            </Routes>
          </Router>
        </StyledEngineProvider>
      </ProviderContext>
    </Provider>
  );
};
