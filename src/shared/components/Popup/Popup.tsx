import cn from 'classnames';
import { PopupProps } from './types';
import styles from './styles.module.scss';
import { preventBodyScrolling } from '../../utils';

export const Popup = ({ opened, setOpened, children }: PopupProps) => {
  const handleBGClick = () => {
    setOpened(false);
    preventBodyScrolling(false);
  };

  const handleContentClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div
      className={cn(styles.popup, { [styles['popup-opened']]: opened })}
      onClick={handleBGClick}
    >
      <div className={styles.container} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};
