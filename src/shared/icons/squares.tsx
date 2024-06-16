import { IconProps } from './types';
import { SVGIcon } from './SVGIcon';

export const Squares = ({
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
    <g clipPath='url(#clip0_1650_11571)'>
      <path
        d='M107 237.457C107 223.95 117.95 213 131.457 213H189.543C203.05 213 214 223.95 214 237.457V295.543C214 309.05 203.05 320 189.543 320H131.457C117.95 320 107 309.05 107 295.543V237.457Z'
        fill='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip1_1650_11571)'>
      <path
        d='M0 131.457C0 117.95 10.9498 107 24.4571 107H82.5429C96.0502 107 107 117.95 107 131.457V189.543C107 203.05 96.0502 214 82.5429 214H24.4571C10.9498 214 0 203.05 0 189.543V131.457Z'
        fill='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip2_1650_11571)'>
      <path
        d='M107.5 131.457C107.5 118.226 118.226 107.5 131.457 107.5H189.543C202.774 107.5 213.5 118.226 213.5 131.457V189.543C213.5 202.774 202.774 213.5 189.543 213.5H131.457C118.226 213.5 107.5 202.774 107.5 189.543V131.457Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip3_1650_11571)'>
      <path
        d='M0.5 24.4571C0.5 11.226 11.226 0.5 24.4571 0.5H82.5429C95.774 0.5 106.5 11.226 106.5 24.4571V82.5429C106.5 95.774 95.774 106.5 82.5429 106.5H24.4571C11.226 106.5 0.5 95.774 0.5 82.5429V24.4571Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <defs>
      <clipPath id='clip0_1650_11571'>
        <rect
          width='107'
          height='107'
          fill='white'
          transform='translate(107 213)'
        />
      </clipPath>
      <clipPath id='clip1_1650_11571'>
        <rect
          width='107'
          height='107'
          fill='white'
          transform='translate(0 107)'
        />
      </clipPath>
      <clipPath id='clip2_1650_11571'>
        <rect
          width='107'
          height='107'
          fill='white'
          transform='translate(107 107)'
        />
      </clipPath>
      <clipPath id='clip3_1650_11571'>
        <rect width='107' height='107' fill='white' />
      </clipPath>
    </defs>
  </SVGIcon>
);
