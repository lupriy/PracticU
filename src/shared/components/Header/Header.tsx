import cn from 'classnames';
import { useMediaQuery } from '@mui/material';
import { MEDIA_QUERY_DESKTOP } from '../../theme/mediaQuery';
import { HeaderProps } from './types';
import styles from './styles.module.scss';

export const Header = ({ children, className }: HeaderProps) => {
  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);

  return (
    <header
      className={cn(
        styles.header,
        {
          [styles['header-grey']]: !matchesDesktop,
        },
        className
      )}
    >
      {children}
    </header>
  );
};
