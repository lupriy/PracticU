import cn from 'classnames';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CourseCardProps } from './types';
import styles from './styles.module.scss';
import { bgHash } from './constants';
import { api } from '../../../../api';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getUserCoursesThunk } from '../../../../redux/userCourses/thunks';
import { userGroupSelector } from '../../../../redux/user/selectors';
import { useNavigate } from 'react-router-dom';
import {
  COURSES_URL_PART,
  ALL_MODULES_URL_PART,
} from '../../../../shared/constants/paths';
import { useMemo } from 'react';

export const CourseCard = ({
  id,
  tag,
  duration,
  price,
  title,
  desc,
  className,
  tags,
  isUserManager,
  mentor,
  setDeleteItems,
  setChangedItem,
  setIsOpen,
}: CourseCardProps & {
  isUserManager: boolean;
  tags: { key: string; name: string }[];
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userGroup = useAppSelector(userGroupSelector);

  const handleClick = () => {
    navigate(`/${COURSES_URL_PART}/${ALL_MODULES_URL_PART}?course-id=${id}`);
  };

  const handleEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(true);
    setChangedItem({
      id,
      tags: [tag],
      name: title,
      description: desc,
      hours: duration,
      price,
      mentor,
    });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      await api.course.courseDestroy(id);
      dispatch(getUserCoursesThunk(userGroup));
      setDeleteItems(state => [...state, id]);
    } catch (e) {
      console.error(e);
    }
  };

  const mainTag = useMemo(
    () => tags?.find(({ key }) => key === tag),
    [tags, tag]
  );

  return (
    <div
      className={cn(
        styles.wrapper,
        className,
        isUserManager ? '' : styles.wrapper__isNotManager
      )}
      onClick={handleClick}
    >
      <div className={styles.header}>
        <span className={cn(styles.tag, styles[`tag-${tag}`])}>
          {mainTag ? mainTag.name : ''}
        </span>
        <p className={styles.info}>
          <span className={styles['info-value']}>{duration}</span>
          <span className={styles['info-text']}> ак.ч.</span>
          <span className={styles['info-value']}>{price}</span>
          <span className={styles['info-text']}> ₽</span>
        </p>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.actions}>
        <span className={styles['actions-item']} onClick={handleEdit}>
          <ModeEditOutlineOutlinedIcon style={{ color: 'white' }} />
        </span>
        <span className={styles['actions-item']} onClick={handleDelete}>
          <DeleteOutlinedIcon style={{ color: 'white' }} />
        </span>
      </div>
      {bgHash[tag]}
    </div>
  );
};
