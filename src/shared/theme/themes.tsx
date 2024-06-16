import { createTheme } from '@mui/material';
import { ReactComponent as TriangleImage } from '../icons/triangle.svg';
import { ReactComponent as CircleImage } from '../icons/circle.svg';
import { ReactComponent as DiamondsImage } from '../icons/diamonds.svg';
import { ReactComponent as RectanglesImage } from '../icons/rectangles.svg';
import { ReactComponent as HexagonsImage } from '../icons/hexagons.svg';
import {
  COLOR_BLUE,
  COLOR_BRUNOYAM,
  COLOR_CHARTREUSE,
  COLOR_GREY3,
  COLOR_ROSE,
  COLOR_VIOLET,
  COLOR_YELLOW,
  COLOR_GREY1,
} from './colors';

type courseImage = (className: string) => JSX.Element;

declare module '@mui/material' {
  interface Theme {
    name: string;
    courseImages: {
      main: courseImage;
      secondary: courseImage;
    };
  }
  interface ThemeOptions {
    name?: string;
    courseImages?: {
      main?: courseImage;
      secondary?: courseImage;
    };
  }
}

export const themeBrunoyam = createTheme({
  name: 'themeBrunoyam',
  palette: {
    primary: {
      main: COLOR_BRUNOYAM,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
});

export const themeRose = createTheme({
  name: 'themeRose',
  palette: {
    primary: {
      main: COLOR_ROSE,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
  courseImages: {
    secondary: className => <TriangleImage className={className} />,
  },
});

export const themeBlue = createTheme({
  name: 'themeBlue',
  palette: {
    primary: {
      main: COLOR_BLUE,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
  courseImages: {
    secondary: className => <CircleImage className={className} />,
  },
});

export const themeСhartreuse = createTheme({
  name: 'themeСhartreuse',
  palette: {
    primary: {
      main: COLOR_CHARTREUSE,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
  courseImages: {
    secondary: className => <RectanglesImage className={className} />,
  },
});

export const themeViolet = createTheme({
  name: 'themeViolet',
  palette: {
    primary: {
      main: COLOR_VIOLET,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
  courseImages: {
    secondary: className => <DiamondsImage className={className} />,
  },
});

export const themeYellow = createTheme({
  name: 'themeYellow',
  palette: {
    primary: {
      main: COLOR_YELLOW,
    },
    info: {
      main: COLOR_GREY3,
    },
  },
  courseImages: {
    secondary: className => <HexagonsImage className={className} />,
  },
});

export const COLOR_BY_TAG = {
  design: COLOR_BLUE,
  analytics: COLOR_CHARTREUSE,
  programming: COLOR_ROSE,
  marketing: COLOR_VIOLET,
  softskills: COLOR_YELLOW,
  other: COLOR_GREY1,
};
