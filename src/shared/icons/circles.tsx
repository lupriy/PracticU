import { IconProps } from './types';
import { SVGIcon } from './SVGIcon';

export const Circles = ({
  size,
  type,
  theme,
  className,
  width,
  height,
  viewBox,
  dataTestId = 'circles-icon',
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
    <g clipPath='url(#clip0_1956_14867)'>
      <path
        d='M92.8333 46.6667C92.8333 55.7976 90.1257 64.7234 85.0528 72.3155C79.98 79.9076 72.7697 85.8249 64.3339 89.3191C55.898 92.8133 46.6155 93.7276 37.66 91.9462C28.7045 90.1649 20.4784 85.7679 14.0219 79.3114C7.56538 72.8549 3.16844 64.6288 1.38709 55.6733C-0.394266 46.7179 0.519988 37.4353 4.01423 28.9994C7.50848 20.5636 13.4258 13.3533 21.0178 8.28049C28.6099 3.20763 37.5358 0.5 46.6667 0.5C58.9108 0.5 70.6535 5.36397 79.3114 14.0219C87.9694 22.6798 92.8333 34.4225 92.8333 46.6667Z'
        fill='white'
        stroke='#D9D9D9'
      />
    </g>
    <g clipPath='url(#clip1_1956_14867)'>
      <path
        d='M92.8333 140C92.8333 149.131 90.1257 158.057 85.0528 165.649C79.98 173.241 72.7697 179.158 64.3339 182.652C55.898 186.147 46.6155 187.061 37.66 185.279C28.7045 183.498 20.4784 179.101 14.0219 172.645C7.56538 166.188 3.16844 157.962 1.38709 149.007C-0.394266 140.051 0.519988 130.769 4.01423 122.333C7.50848 113.897 13.4258 106.687 21.0178 101.614C28.6099 96.5409 37.5358 93.8333 46.6667 93.8333C58.9108 93.8333 70.6535 98.6972 79.3114 107.355C87.9694 116.013 92.8333 127.756 92.8333 140Z'
        fill='#D9D9D9'
        stroke='#D9D9D9'
      />
    </g>
    <path
      d='M186.167 140C186.167 149.131 183.459 158.057 178.386 165.649C173.313 173.241 166.103 179.158 157.667 182.652C149.231 186.147 139.949 187.061 130.993 185.279C122.038 183.498 113.812 179.101 107.355 172.645C100.899 166.188 96.5018 157.962 94.7204 149.007C92.9391 140.051 93.8533 130.769 97.3476 122.333C100.842 113.897 106.759 106.687 114.351 101.614C121.943 96.5409 130.869 93.8333 140 93.8333C152.244 93.8333 163.987 98.6972 172.645 107.355C181.303 116.013 186.167 127.756 186.167 140Z'
      fill='white'
      stroke='#D9D9D9'
    />
    <path
      d='M186.167 233.333C186.167 242.464 183.459 251.39 178.386 258.982C173.313 266.574 166.103 272.491 157.667 275.986C149.231 279.48 139.949 280.394 130.993 278.613C122.038 276.831 113.812 272.434 107.355 265.978C100.899 259.521 96.5018 251.295 94.7204 242.34C92.9391 233.384 93.8533 224.102 97.3476 215.666C100.842 207.23 106.759 200.02 114.351 194.947C121.943 189.874 130.869 187.167 140 187.167C152.244 187.167 163.987 192.03 172.645 200.688C181.303 209.346 186.167 221.089 186.167 233.333Z'
      fill='#D9D9D9'
      stroke='#D9D9D9'
    />
    <defs>
      <clipPath id='clip0_1956_14867'>
        <rect width='93.3333' height='93.3333' fill='white' />
      </clipPath>
      <clipPath id='clip1_1956_14867'>
        <rect
          width='93.3333'
          height='93.3333'
          fill='white'
          transform='translate(0 93.3333)'
        />
      </clipPath>
    </defs>
  </SVGIcon>
);