import React from 'react';
import cn from 'classnames';
import { useMediaQuery } from '@mui/material';

import { Navigation } from '../../shared/components/Navigation';
import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../shared/theme/mediaQuery';
import { Content } from './Content';
import styles from './styles.module.scss';

export const MyMentors = () => {
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

  return (
    <>
      <Navigation />
      <div className={PAGE_CONTAINER_STYLES}>
        <Content />
      </div>
    </>
  );
};
