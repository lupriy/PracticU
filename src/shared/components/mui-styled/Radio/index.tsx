import { Radio, radioClasses, styled } from '@mui/material';

export const StyledRadio = styled(Radio)(({ theme }) => ({
  [`&, &.${radioClasses.checked}`]: {
    color: theme.palette.primary.main,
  },
}));
