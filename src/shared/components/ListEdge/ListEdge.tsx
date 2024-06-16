import cn from 'classnames';
import styles from './styles.module.scss';
import { ListEdgeProps } from './types';

export const ListEdge = ({ className }: ListEdgeProps) => (
  <div className={cn(styles.edge, className)} />
);
