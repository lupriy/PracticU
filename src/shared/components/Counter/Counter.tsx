import cn from 'classnames';
import { CounterProps } from './types';
import styles from './styles.module.scss';

export const Counter = ({ amount, className }: CounterProps) => (
  <div className={cn(styles.wrapper, 'size-xxxs', className)}>{amount}</div>
);
