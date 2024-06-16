import React from 'react';
import styles from './styles.module.scss';

const BackIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.3333 9.16681H3.67832L8.08915 4.75598C8.16874 4.67911 8.23223 4.58715 8.2759 4.48548C8.31957 4.38381 8.34256 4.27447 8.34352 4.16382C8.34449 4.05317 8.3234 3.94343 8.2815 3.84102C8.2396 3.73861 8.17772 3.64556 8.09948 3.56732C8.02123 3.48908 7.92819 3.4272 7.82578 3.3853C7.72336 3.3434 7.61363 3.32231 7.50298 3.32327C7.39233 3.32424 7.28298 3.34722 7.18131 3.3909C7.07964 3.43457 6.98769 3.49806 6.91082 3.57765L1.07748 9.41098C0.921259 9.56725 0.833496 9.77917 0.833496 10.0001C0.833496 10.2211 0.921259 10.433 1.07748 10.5893L6.91082 16.4226C7.06798 16.5744 7.27849 16.6584 7.49698 16.6565C7.71548 16.6546 7.92449 16.567 8.079 16.4125C8.2335 16.258 8.32114 16.049 8.32304 15.8305C8.32494 15.612 8.24095 15.4015 8.08915 15.2443L3.67832 10.8335H18.3333C18.5543 10.8335 18.7663 10.7457 18.9226 10.5894C19.0788 10.4331 19.1666 10.2212 19.1666 10.0001C19.1666 9.77913 19.0788 9.56717 18.9226 9.41089C18.7663 9.25461 18.5543 9.16681 18.3333 9.16681Z'
        fill='#9AA1B0'
      />
    </svg>
  );
};

interface IProps {
  isModules?: boolean;
  moduleTitle?: string;
  handleBackPage(): void;
}

const ButtonBack = ({ isModules, moduleTitle, handleBackPage }: IProps) => {
  return (
    <div className={styles.buttonBack} onClick={handleBackPage}>
      <BackIcon />
      {isModules ? 'Все курсы' : moduleTitle}
    </div>
  );
};

export default ButtonBack;