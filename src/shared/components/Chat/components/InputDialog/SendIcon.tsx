import React from 'react';

type Props = {
  isDisabled: boolean;
};

export const SendIcon = ({ isDisabled }: Props) => {
  const color = isDisabled ? '#C1C4CB' : '#EB5D18';

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_3210_23248)'>
        <path
          d='M22.5707 10.2137L3.20691 2.17884C2.39115 1.84031 1.46954 1.98923 0.801801 2.5673C0.134066 3.14545 -0.145215 4.03627 0.0730348 4.89207L1.79658 11.6511H10.2353C10.6236 11.6511 10.9385 11.9659 10.9385 12.3543C10.9385 12.7426 10.6237 13.0574 10.2353 13.0574H1.79658L0.0730348 19.8164C-0.145215 20.6722 0.134019 21.563 0.801801 22.1412C1.4709 22.7204 2.3926 22.8675 3.20696 22.5296L22.5708 14.4948C23.4524 14.129 24 13.3088 24 12.3543C24 11.3997 23.4524 10.5795 22.5707 10.2137Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_3210_23248'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
