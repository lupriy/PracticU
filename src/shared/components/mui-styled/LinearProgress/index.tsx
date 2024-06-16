import { LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { COLOR_GREY3 } from '../../../theme/colors';

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 100,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: COLOR_GREY3,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));
