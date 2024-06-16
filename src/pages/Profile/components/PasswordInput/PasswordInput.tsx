import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '../../../../shared/components/mui-styled/TextField';
import { useState } from 'react';

type PropsType = {
  label: string;
  password: string;
  handlePasswordChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  className?: string;
  name: string;
  isError?: boolean;
};

export const PasswordInput = ({
  label,
  password,
  handlePasswordChange,
  className = '',
  name,
  isError = false,
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <StyledTextField
      variant='outlined'
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handlePasswordChange}
      name={name}
      error={isError}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={handleClickShowPassword}
              sx={{ color: '#9AA1B0' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      className={className}
    />
  );
};
