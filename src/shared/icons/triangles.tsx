import { IconProps } from './types';
import { SVGIcon } from './SVGIcon';

export const Triangles = ({
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
    <g clipPath='url(#clip0_1956_14784)'>
      <path
        d='M93.5 185.191V93.809L184.882 139.5L93.5 185.191Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip1_1956_14784)'>
      <path
        d='M93.5 92.191V0.809017L184.882 46.5L93.5 92.191Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip2_1956_14784)'>
      <path
        d='M0.5 185.191V93.809L91.882 139.5L0.5 185.191Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip3_1956_14784)'>
      <path
        d='M0.5 278.191V186.809L91.882 232.5L0.5 278.191Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <defs>
      <clipPath id='clip0_1956_14784'>
        <rect
          width='93'
          height='93'
          fill='white'
          transform='translate(93 93)'
        />
      </clipPath>
      <clipPath id='clip1_1956_14784'>
        <rect width='93' height='93' fill='white' transform='translate(93)' />
      </clipPath>
      <clipPath id='clip2_1956_14784'>
        <rect width='93' height='93' fill='white' transform='translate(0 93)' />
      </clipPath>
      <clipPath id='clip3_1956_14784'>
        <rect
          width='93'
          height='93'
          fill='white'
          transform='translate(0 186)'
        />
      </clipPath>
    </defs>
  </SVGIcon>
);
