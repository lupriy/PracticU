import {
  styled,
  TextField,
  formLabelClasses,
  outlinedInputClasses,
} from '@mui/material';
import { SIZE_M } from '../../../theme/typography';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  // input label when focused
  [`& ${formLabelClasses.focused}`]: {
    color: theme.palette.primary.main,
  },
  // focused color for input with variant='outlined'
  [`& ${outlinedInputClasses.root}`]: {
    borderRadius: 1,
    ...SIZE_M,
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
