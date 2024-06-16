import React, { forwardRef } from 'react';
import cn from 'classnames';
import { useTheme } from '@mui/material';
import { COLOR_BLACK, COLOR_WHITE } from '../../theme/colors';
import { Props } from './types';
import styles from './styles.module.scss';

export const Button = forwardRef(
  (
    {
      children,
      type = 'primary',
      color = 'brunoyam',
      className,
      withTheme,
      disabled = false,
      onClick,
    }: Props,
    ref: React.LegacyRef<HTMLButtonElement>
  ) => {
    const theme = useTheme();

    return (
      <button
        disabled={disabled}
        className={cn(
          styles.button,
          withTheme ? styles[theme.name] : styles[color],
          { [styles.text]: color !== 'white' },
          { [styles.disabled]: disabled },
          className
        )}
        onClick={onClick}
        style={
          withTheme && type === 'secondary'
            ? {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: COLOR_WHITE,
                color: COLOR_BLACK,
              }
            : {}
        }
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
