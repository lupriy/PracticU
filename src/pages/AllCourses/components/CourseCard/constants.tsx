import {
  Triangles,
  Circles,
  Hexagons,
  Diamonds,
  Squares,
} from '../../../../shared/icons';
//import { BgHashMap } from "./types";
import styles from './styles.module.scss';

export const bgHash: any = {
  design: (
    <Circles
      width={187}
      height={280}
      viewBox='0 0 187 280'
      className={styles.background}
    />
  ),
  marketing: (
    <Diamonds
      width={187}
      height={280}
      viewBox='0 0 187 280'
      className={styles.background}
    />
  ),
  analytics: (
    <Hexagons
      width={187}
      height={280}
      viewBox='0 0 187 280'
      className={styles.background}
    />
  ),
  programming: (
    <Triangles
      width={187}
      height={280}
      viewBox='0 0 187 280'
      className={styles.background}
    />
  ),
  softskills: (
    <Squares
      width={187}
      height={280}
      viewBox='0 0 187 280'
      className={styles.background}
    />
  ),
};
