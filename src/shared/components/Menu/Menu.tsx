import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { MenuProps } from './types';
import styles from './styles.module.scss';

export const Menu = ({ onClick }: MenuProps) => (
  <div onClick={onClick} className={styles.menu}>
    <MenuIcon />
  </div>
);
