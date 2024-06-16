import { ReactNode } from 'react';
import { IconProps } from '../types';

export type SvgIconProps = {
  viewBox?: string;
  children: ReactNode;
  width?: number;
  height?: number;
} & IconProps;
