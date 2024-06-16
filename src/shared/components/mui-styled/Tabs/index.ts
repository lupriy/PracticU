import { Tabs, tabsClasses, styled } from '@mui/material';
import { COLOR_BLACK } from '../../../theme/colors';

export const StyledTabs = styled(Tabs)(() => ({
  [`&, &.${tabsClasses.root}`]: {
    color: COLOR_BLACK,
  },
  [`& .MuiTabs-indicator`]: {
    backgroundColor: COLOR_BLACK,
  },
}));
