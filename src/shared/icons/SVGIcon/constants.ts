export const TYPES = {
  default: 'default',
  primary: 'primary',
  danger: 'danger',
  warning: 'warning',
  important: 'important',
};

export const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

export const THEMES = {
  dark: 'dark',
  light: 'light',
} as const;

export const COLORS = {
  [THEMES.dark]: {
    [TYPES.default]: '#FFFFFF',
  },
  [THEMES.light]: {
    [TYPES.default]: '#171A1C',
    [TYPES.primary]: '#40A642',
    [TYPES.danger]: '#F12727',
    [TYPES.warning]: '#FFCF1A',
    [TYPES.important]: '#FF881B',
  },
} as const;
