import {
  themeBlue,
  themeBrunoyam,
  themeRose,
  themeViolet,
  themeYellow,
  themeСhartreuse,
} from '../theme/themes';

export const setTheme = (courseTag: string) => {
  switch (courseTag) {
    case 'programming':
      return themeRose;

    case 'marketing':
      return themeViolet;

    case 'design':
      return themeBlue;

    case 'analytics':
      return themeСhartreuse;

    case 'softskills':
      return themeYellow;

    default:
      return themeBrunoyam;
  }
};
