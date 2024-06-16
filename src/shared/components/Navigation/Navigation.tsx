import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { CircularProgress, useMediaQuery } from '@mui/material';

import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../theme/mediaQuery';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userGroupSelector, userSelector } from '../../../redux/user/selectors';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import { ReactComponent as GraduationCapIcon } from '../../icons/graduationCap.svg';
import { ReactComponent as BlocksIcon } from '../../icons/blocks.svg';
import { ReactComponent as DialogIcon } from '../../icons/dialog.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { ReactComponent as LogoIcon } from '../../icons/logo.svg';
import { ReactComponent as MyStudentsIcon } from '../../icons/readingBookIcon.svg';
import { StyledContextMenu } from '../mui-styled/ContextMenu';
import { auth } from '../../../api/Auth';
import { COLOR_ERROR } from '../../theme/colors';
import { userCoursesSelector } from '../../../redux/userCourses/selectors';
import { userAvatarSelector } from '../../../redux/userAvatar/selectors';
import { getUserThunk } from '../../../redux/user/thunks';
import { getUserAvatarThunk } from '../../../redux/userAvatar/thunks';
import { getCourseProgress } from 'redux/courseProgress/thunk';
import { courseProgressSelector } from 'redux/courseProgress/selectors';
import {
  ALL_MODULES_URL_PART,
  MY_MENTORS_URL_PART,
  COURSES_URL_PART,
  LESSON_URL_PART,
  MODULE_URL_PART,
  MY_STUDENTS_URL_PART,
  PROFILE_URL_PART,
} from '../../constants/paths';
import { ListEdge } from '../ListEdge';
//import { Counter } from '../Counter';
import ButtonBack from './ButtonBack';
import {
  IDataCourse,
  MenuDetailedInformation,
} from '../MenuDetailedInformation';
import userPhotoPlaceholder from '../../../shared/icons/userPhotoPlaceholder.svg';
import { changeUserSelectedCourse } from '../../../redux/user/reducer';
import { Course } from '../../../api';

import styles from './styles.module.scss';
import { getUserCoursesThunk } from 'redux/userCourses/thunks';

interface IProps {
  isMobile?: boolean;
  isModules?: boolean;
  isLesson?: boolean;
  isProfile?: boolean;
  isChangePassword?: boolean;
  moduleTitle?: string;
  isNotVisibleLeftSideBar?: boolean;
  isVisibleMenuDetailedInformation?: boolean;
  infoModule?: IDataCourse | null;
  handleBackPage?: () => void;
}

export const Navigation = ({
  isMobile,
  isModules,
  isLesson,
  isProfile,
  isChangePassword,
  moduleTitle,
  isNotVisibleLeftSideBar,
  isVisibleMenuDetailedInformation,
  infoModule,
  handleBackPage,
}: IProps) => {
  const isBackButtonVisible =
    !isMobile && (isModules || isLesson || isChangePassword);

  const [showMenu, setShowMenu] = useState(false);
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const navigate = useNavigate();

  const user = useAppSelector(userSelector);
  const courses = useAppSelector(userCoursesSelector);
  const userGroup = useAppSelector(userGroupSelector);
  const userAvatar = useAppSelector(userAvatarSelector);
  const userActiveCourse = useAppSelector(courseProgressSelector);

  const dispatch = useAppDispatch();

  const handleClickChat = () => {
    navigate(`/${MY_MENTORS_URL_PART}`);
  };

  const handleLogout = useCallback(async () => {
    setIsLogoutLoading(true);
    const logoutResponse = await auth.logout();
    if (logoutResponse.ok) {
      setIsLogoutLoading(false);
    }
  }, []);

  const handleClose = () => {
    setShowMenu(false);
  };

  const handleCourseClick = (selectedCourse: Course) => {
    const { id, name } = selectedCourse;

    if (userGroup === 'mentor') {
      const navigateUrl = `${COURSES_URL_PART}/${name}/${MODULE_URL_PART}-1/${LESSON_URL_PART}-1`;
      navigate(navigateUrl);
    } else if (userGroup === 'student') {
      dispatch(changeUserSelectedCourse(selectedCourse));
      dispatch(getCourseProgress(id));
      navigate('/');
    } else if (userGroup === 'manager') {
      const navigateUrl = `${COURSES_URL_PART}/${ALL_MODULES_URL_PART}?course-id=${id}`;
      navigate(navigateUrl);
    }
  };

  const handleAllCoursesClick = () => {
    navigate(`/${COURSES_URL_PART}/all`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMyStudentsClick = () => {
    navigate(`/${MY_STUDENTS_URL_PART}`);
  };

  const handlePersonalAccountClick = useCallback(() => {
    navigate(`/${PROFILE_URL_PART}`);
  }, [navigate]);

  const PROFILE_MENU_LIST = [
    {
      content: 'Личный кабинет',
      color: '00000',
      onClick: handlePersonalAccountClick,
    },
    {
      content: 'Выйти',
      color: COLOR_ERROR,
      onClick: handleLogout,
    },
  ];

  const PROFILE_MENU_LIST_LOADING = [
    {
      content: (
        <div className={styles['user-profile-menu-progress-wrapper']}>
          <CircularProgress size={24} color='info' />
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  //TODO: Возможно пригодится, но сейчас это вызывает неправильную работу инпутов
  // const [focusRef, setFocus] = useFocus();
  // useEffect(() => {
  //   if (typeof setFocus === 'function') {
  //     setFocus();
  //   }
  // }, [setFocus]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!userAvatar) {
      dispatch(getUserAvatarThunk());
    }
  }, [userAvatar, dispatch]);

  useEffect(() => {
    if (!courses && userGroup) {
      dispatch(getUserCoursesThunk(userGroup));
    }
  }, [courses, dispatch, userGroup]);

  return (
    <>
      {isVisibleMenuDetailedInformation && infoModule && (
        <MenuDetailedInformation infoModule={infoModule} />
      )}
      <Header className={cn({ [styles['page-header']]: matchesDesktop })}>
        {isBackButtonVisible && handleBackPage && (
          <ButtonBack
            isModules={isModules}
            moduleTitle={moduleTitle}
            handleBackPage={handleBackPage}
          />
        )}
        {!matchesDesktop && <Menu onClick={() => setShowMenu(!showMenu)} />}
        <div
          className={cn(styles.user, {
            [styles['user-mobile']]: matchesMobile && !matchesTablet,
          })}
        >
          {(user?.first_name || user?.last_name) && (
            <div
              className={styles.userBlock}
              onClick={() => setIsUserMenuOpened(!isUserMenuOpened)}
            >
              <img
                src={userAvatar ? userAvatar : userPhotoPlaceholder}
                alt='avatar'
                className={styles.avatar}
              />
              <p
                className={styles.userName}
              >{`${user.first_name} ${user.last_name}`}</p>
              <ChevronIcon
                className={cn(styles['user-menu'], {
                  [styles['user-menu-opened']]: isUserMenuOpened,
                })}
              />
            </div>
          )}
          {isUserMenuOpened && (
            <StyledContextMenu
              className={cn(styles['user-profile-menu'], {
                [styles['user-profile-menu-mobile']]:
                  matchesMobile && !matchesTablet,
              })}
              list={
                isLogoutLoading ? PROFILE_MENU_LIST_LOADING : PROFILE_MENU_LIST
              }
            />
          )}
        </div>
      </Header>
      {!isNotVisibleLeftSideBar && (matchesDesktop || showMenu) && (
        <aside
          className={cn(
            styles.aside,
            { [styles['aside-mobile']]: matchesMobile && !matchesTablet },
            {
              [styles['aside-tablet']]: matchesTablet && !matchesDesktop,
            }
          )}
          tabIndex={-1}
          onBlur={handleClose}
        >
          <div className={styles.buttons}>
            {!matchesDesktop && (
              <CloseIcon
                className={styles.close}
                width={24}
                height={24}
                onClick={handleClose}
              />
            )}
            <LogoIcon className={styles.logo} onClick={handleLogoClick} />
          </div>
          <ul>
            <li>
              {isProfile && (
                <div className={styles['aside-menu-item']}>
                  <BlocksIcon />
                  Личные данные
                </div>
              )}
              {!isProfile && (
                <div className={styles['aside-menu-item']}>
                  <GraduationCapIcon />
                  Мои курсы
                </div>
              )}

              {courses && !isProfile && (
                <ul>
                  {courses.results?.map((course: Course) => (
                    <li
                      key={course.id}
                      className={styles['courses-item']}
                      onClick={() => handleCourseClick(course)}
                    >
                      {userActiveCourse?.course.id === course.id && (
                        <ListEdge />
                      )}
                      {course.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {!isProfile && userGroup === 'manager' && (
              <li
                className={styles['aside-menu-item']}
                onClick={handleAllCoursesClick}
              >
                <BlocksIcon />
                <span>Редактор курсов</span>
              </li>
            )}
            {userGroup === 'student' && (
              <li
                className={styles['aside-menu-item']}
                onClick={handleClickChat}
              >
                <DialogIcon />
                <span className={styles['aside-menu-item-chat']}>
                  <span>Чат</span>
                  {/*  {!!unreadMessagesAmount && (
                    <Counter amount={unreadMessagesAmount} />
                  )} */}
                </span>
              </li>
            )}
            {!isProfile && userGroup === 'mentor' && (
              <li onClick={handleMyStudentsClick}>
                <div className={styles['aside-menu-item']}>
                  <MyStudentsIcon />
                  Мои ученики
                </div>
              </li>
            )}
          </ul>
        </aside>
      )}
    </>
  );
};
