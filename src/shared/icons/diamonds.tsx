import { IconProps } from './types';
import { SVGIcon } from './SVGIcon';

export const Diamonds = ({
  size,
  type,
  theme,
  className,
  width,
  height,
  viewBox,
  dataTestId = 'diamonds-icon',
}: IconProps) => (
  <SVGIcon
    size={size}
    width={width}
    height={height}
    viewBox={viewBox}
    type={type}
    theme={theme}
    className={className}
    dataTestId={dataTestId}
  >
    <g clipPath='url(#clip0_1956_14753)'>
      <path
        d='M1.04449 46.6665L46.9986 0.71243L92.9526 46.6665L46.9986 92.6206L1.04449 46.6665Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip1_1956_14753)'>
      <path
        d='M1.04449 140L46.9986 94.0459L92.9526 140L46.9986 185.954L1.04449 140Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip2_1956_14753)'>
      <path
        d='M94.3778 140L140.332 94.0459L186.286 140L140.332 185.954L94.3778 140Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip3_1956_14753)'>
      <path
        d='M94.3778 233.333L140.332 187.379L186.286 233.333L140.332 279.288L94.3778 233.333Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <defs>
      <clipPath id='clip0_1956_14753'>
        <rect
          width='93.3333'
          height='93.3333'
          fill='white'
          transform='translate(0.333313)'
        />
      </clipPath>
      <clipPath id='clip1_1956_14753'>
        <rect
          width='93.3333'
          height='93.3333'
          fill='white'
          transform='translate(0.333313 93.3335)'
        />
      </clipPath>
      <clipPath id='clip2_1956_14753'>
        <rect
          width='93.3333'
          height='93.3333'
          fill='white'
          transform='translate(93.6666 93.3335)'
        />
      </clipPath>
      <clipPath id='clip3_1956_14753'>
        <rect
          width='93.3333'
          height='93.3333'
          fill='white'
          transform='translate(93.6666 186.667)'
        />
      </clipPath>
    </defs>
  </SVGIcon>
);
