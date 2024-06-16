import { useEffect, useState, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import cn from 'classnames';
import { Button } from '../../shared/components/Button';
import { Navigation } from '../../shared/components/Navigation';
import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../shared/theme/mediaQuery';
import { TagValue } from './types';
import styles from './styles.module.scss';
import { CourseCard, PopupForm } from './components';
import { preventBodyScrolling } from '../../shared/utils';
import { Popup } from '../../shared/components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCourseListThunk } from '../../redux/courseList/thunks';
import { coursesByTagSelector } from '../../redux/courseList/selectors';
import { Course } from '../../api';
import { CourseChangeModal } from './components';
import { userSelector } from '../../redux/user/selectors';
import { api } from '../../api';

const { tagList } = api.tag;

export const AllCourses = () => {
  const dispatch = useAppDispatch();

  const [tags, setTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [popupOpened, setPopupOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [deleteItems, setDeleteItems] = useState<number[]>([]);
  const [changedItem, setChangedItem] = useState<Course | null>(null);

  const user = useAppSelector(userSelector);
  const isUserManager = useMemo(
    () => !!user && user.groups.some(item => item === 'manager'),
    [user]
  );

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const res = await tagList();
        //@ts-ignore
        setTags(res.data.results);
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, []);

  const courses = useAppSelector(state =>
    coursesByTagSelector(state, activeFilter)
  );

  const newCourses = useMemo(() => {
    const coursesFormat = courses.map(item => {
      const { id: itemId } = item;
      const { id: changedItemId } = changedItem || { id: null };

      if (itemId === changedItemId) return changedItem;
      return item;
    });
    const coursesFilter = coursesFormat.filter(item => item);

    return coursesFilter as Course[];
  }, [changedItem, courses]);

  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const PAGE_CONTAINER_STYLES = cn(
    { [styles['page-container']]: matchesDesktop },
    {
      [styles['page-container-tablet']]: matchesTablet && !matchesDesktop,
    },
    {
      [styles['page-container-mobile']]: matchesMobile && !matchesTablet,
    }
  );

  const handleAddClick = () => {
    setPopupOpened(true);
    preventBodyScrolling(true);
  };

  useEffect(() => {
    if (!popupOpened) {
      dispatch(getCourseListThunk());
    }
  }, [dispatch, popupOpened]);

  return (
    <>
      <Navigation />
      <div className={PAGE_CONTAINER_STYLES}>
        <h1 className={styles.title}>
          Все курсы
          {isUserManager && (
            <span className={styles.add} onClick={handleAddClick}>
              <AddIcon style={{ color: 'white' }} />
            </span>
          )}
        </h1>
        <div className={styles.buttons}>
          {tags.map(({ key, name }) => (
            <Button
              key={key}
              onClick={() => {
                setActiveFilter(state => (state === key ? '' : key));
              }}
              className={cn(styles.button, {
                [styles['button-active']]: key === activeFilter,
              })}
              type='secondary'
            >
              {name}
            </Button>
          ))}
        </div>
        <div className={styles['courses-container']}>
          {newCourses.map(course => {
            const {
              id,
              tags: tagsCouts,
              hours,
              price,
              name,
              description,
              mentor,
            } = course;
            const isDeleteItem = deleteItems.some(item => item === id);

            return (
              !isDeleteItem && (
                <CourseCard
                  key={id}
                  id={id}
                  tag={tagsCouts[0] as TagValue}
                  tags={tags}
                  duration={hours}
                  price={price}
                  title={name}
                  mentor={mentor}
                  isUserManager={isUserManager}
                  setDeleteItems={setDeleteItems}
                  setChangedItem={setChangedItem}
                  setIsOpen={setIsOpen}
                  // TODO: delete when backend is ready
                  //@ts-ignore
                  desc={description}
                  className={cn(styles['current-lesson'], {
                    [styles['current-lesson-mobile']]: !matchesTablet,
                  })}
                />
              )
            );
          })}
        </div>
      </div>
      <Popup opened={popupOpened} setOpened={setPopupOpened}>
        <PopupForm tags={tags} setPopupOpened={setPopupOpened} />
      </Popup>
      <Popup opened={isOpen} setOpened={setIsOpen}>
        <CourseChangeModal
          setIsOpen={setIsOpen}
          changedItem={changedItem}
          setChangedItem={setChangedItem}
          tags={tags}
        />
      </Popup>
    </>
  );
};
