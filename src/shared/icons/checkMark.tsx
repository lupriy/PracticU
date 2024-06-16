import React from 'react';

type TProps = { color?: string };

export const CheckMark = ({ color }: TProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.5568 5.44267C21.1476 6.03341 21.1476 6.99101 20.5568 7.58146L10.4114 17.7272C9.82062 18.3177 8.86332 18.3177 8.27257 17.7272L3.44294 12.8973C2.85219 12.3068 2.85219 11.3492 3.44294 10.7588C4.03339 10.168 4.99098 10.168 5.58143 10.7588L9.34182 14.5192L18.418 5.44267C19.0088 4.85222 19.9664 4.85222 20.5568 5.44267Z'
        fill={color || '#DB5B73'}
      />
    </svg>
  );
};
