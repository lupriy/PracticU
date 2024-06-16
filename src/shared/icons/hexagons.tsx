import { IconProps } from './types';
import { SVGIcon } from './SVGIcon';

export const Hexagons = ({
  size,
  type,
  theme,
  className,
  width,
  height,
  viewBox,
  dataTestId = 'hexagons-icon',
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
    <g clipPath='url(#clip0_1956_14887)'>
      <path
        d='M94.1361 46.7885L117.287 0.5H163.458L186.608 46.7885L163.458 93.077H117.287L94.1361 46.7885Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip1_1956_14887)'>
      <path
        d='M94.1361 46.7885L117.287 0.5H163.458L186.608 46.7885L163.458 93.077H117.287L94.1361 46.7885Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip2_1956_14887)'>
      <path
        d='M0.55905 139.634L23.71 93.3459H69.8805L93.0315 139.634L69.8805 185.923H23.71L0.55905 139.634Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip3_1956_14887)'>
      <path
        d='M0.55905 233.211L23.71 186.923H69.8805L93.0315 233.211L69.8805 279.5H23.71L0.55905 233.211Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip4_1956_14887)'>
      <path
        d='M94.1361 140.366L117.287 94.0771H163.458L186.608 140.366L163.458 186.654H117.287L94.1361 140.366Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <defs>
      <clipPath id='clip0_1956_14887'>
        <rect
          width='93.577'
          height='93.577'
          fill='white'
          transform='translate(93.577)'
        />
      </clipPath>
      <clipPath id='clip1_1956_14887'>
        <rect
          width='93.577'
          height='93.577'
          fill='white'
          transform='translate(93.577)'
        />
      </clipPath>
      <clipPath id='clip2_1956_14887'>
        <rect
          width='93.577'
          height='93.577'
          fill='white'
          transform='translate(0 92.8459)'
        />
      </clipPath>
      <clipPath id='clip3_1956_14887'>
        <rect
          width='93.577'
          height='93.577'
          fill='white'
          transform='translate(0 186.423)'
        />
      </clipPath>
      <clipPath id='clip4_1956_14887'>
        <rect
          width='93.577'
          height='93.577'
          fill='white'
          transform='translate(93.577 93.5771)'
        />
      </clipPath>
    </defs>
  </SVGIcon>
);
