import React from 'react';

export type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  withTheme?: boolean;
  type?: 'primary' | 'secondary';
  color?:
    | 'brunoyam'
    | 'blue'
    | 'chartreuse'
    | 'rose'
    | 'violet'
    | 'yellow'
    | 'white'
    | 'success'
    | 'error';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
