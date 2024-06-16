import { SIZES, TYPES, THEMES } from './SVGIcon/constants';

type SIZE = keyof typeof SIZES;
type TYPE = keyof typeof TYPES;
type THEME = keyof typeof THEMES;

export type IconProps = {
  /**
   * Размер иконки
   */
  size?: SIZE;
  /**
   * Тип иконки
   */
  type?: TYPE;
  /**
   * Тема иконки
   */
  theme?: THEME;
  /**
   * Пользовательское имя класса
   */
  className?: string;
  /**
   * Идентификатор для автоматизированного тестирования
   */
  dataTestId?: string;
  /**
   * Ширины иконки
   */
  width?: number;
  /**
   * Высота иконки
   */
  height?: number;
  /**
   * viewBox иконки
   */
  viewBox?: string;
};
