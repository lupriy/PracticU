import React, { useMemo } from 'react';
import cn from 'classnames';

import { getWordFromNumber } from 'shared/utils';
import { Plus, Back } from './icons';
import { TagValue } from '../../../pages/AllCourses/types';
import { tagsRUHash } from '../../../pages/AllCourses/constants';
import { Skeleton } from '@mui/material';

import styles from './CardContainer.module.scss';

const ARR_SKELETON = [1, 2, 3];

const pricePorrection = (price: number) => {
  return price.toLocaleString('ru-RU', { useGrouping: true });
};

interface IProps {
  isUserManager: boolean;
  title: string;
  isModules?: boolean;
  isMobile?: boolean;
  tag?: string;
  hours?: number;
  price?: number;
  numberModule?: number;
  countLesson?: number;
  children?: React.ReactNode;
  setIsOpenModalAdd: (state: boolean) => void;
  handleBackPage?: () => void;
}

export const CardContainer = ({
  isUserManager,
  isModules,
  isMobile,
  title,
  tag,
  hours,
  price,
  numberModule,
  countLesson,
  children,
  setIsOpenModalAdd,
  handleBackPage,
}: IProps) => {
  const lessonLable = useMemo(
    () =>
      getWordFromNumber({
        number: countLesson,
        words: ['урок', 'урока', 'уроков'],
      }),
    [countLesson]
  );

  const handleClick = () => setIsOpenModalAdd(true);

  const isLoading = !children;

  const cardsSkeleton = ARR_SKELETON.map(val => (
    <Skeleton
      variant='rectangular'
      width={352}
      height={258}
      key={val}
      className=''
    />
  ));

  return (
    <div className={styles.block}>
      {isMobile && (
        <div className={styles.buttonBack} onClick={handleBackPage}>
          <Back /> {isModules ? 'Все курсы' : 'Все модули'}
        </div>
      )}

      <div className={styles.topRow}>
        <div className={styles.title}>
          {title || <Skeleton width='350px' />}
        </div>
        {isUserManager && (
          <div className={styles.addedButton} onClick={handleClick}>
            <Plus />
          </div>
        )}
      </div>

      {isModules ? (
        <div className={styles.secondRow}>
          <span className={cn(styles.tag, styles[`tag-${tag}`])}>
            {tag ? (
              tagsRUHash[tag as TagValue]
            ) : (
              <Skeleton variant='rectangular' width='200px' height='32px' />
            )}
          </span>
          <div className={styles.hours}>
            <b>{hours}</b> ак.ч.
          </div>
          <div className={styles.price}>
            <b>{pricePorrection(price ?? 0)}</b> ₽
          </div>
        </div>
      ) : (
        <div className={styles.des}>
          Модуль {numberModule ?? <Skeleton variant='text' width='10px' />},{' '}
          {countLesson ?? <Skeleton variant='text' width='10px' />}{' '}
          {lessonLable}.
        </div>
      )}

      <div className={styles.content}>
        {isLoading ? cardsSkeleton : children}
      </div>
    </div>
  );
};
