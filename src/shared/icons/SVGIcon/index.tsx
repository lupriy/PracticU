import { SIZES, COLORS } from './constants';
import { SvgIconProps } from './types';

export const SVGIcon = ({
  children,
  className,
  size = 'small',
  type = 'default',
  theme = 'light',
  viewBox = '0 0 16 16',
  dataTestId = 'svg-icon',
  width,
  height,
}: SvgIconProps) => {
  const iconSize = !width || !height ? SIZES[size] : undefined;
  const iconColor = COLORS[theme][type];

  return (
    <svg
      fill={iconColor}
      width={iconSize ?? width}
      height={iconSize ?? height}
      viewBox={viewBox}
      focusable={false}
      className={className}
      data-test-id={dataTestId}
      xmlns='http://www.w3.org/2000/svg'
    >
      {children}
    </svg>
  );
};
