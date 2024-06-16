import { useState } from 'react';
import { Header } from '../../../shared/components/Header';
import { Menu as MenuButton } from '../../../shared/components/Menu';
import { Menu } from './Menu';
import { HeaderProps } from './types';
import styles from './styles.module.scss';

export const CourseHeader = ({ menuContent }: HeaderProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleMenuOnClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Header>
          <MenuButton onClick={handleMenuOnClick} />
        </Header>
      </nav>
      {isMenuOpened && (
        <Menu handleClose={handleMenuOnClick} content={menuContent} />
      )}
    </>
  );
};
