import { useRef, useState, useCallback } from 'react';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  ThemeProvider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '../../shared/components/Button';
import { StyledTextField } from '../../shared/components/mui-styled/TextField';
import { themeBrunoyam } from '../../shared/theme/themes';
import { auth as user } from '../../api/Auth';
import { ReactComponent as LogoIcon } from '../../shared/icons/logo.svg';
import styles from './styles.module.scss';

export const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);
  const [isLoginRequestLoading, setIsLoginRequestLoading] = useState(false);
  const input2Ref: React.Ref<any> = useRef(null);

  const onButtonClick = async () => {
    setIsLoginRequestLoading(true);
    const loginResponse = await user.login(email, password);

    if (loginResponse?.ok && user.isAuthenticated()) {
      setShowLoginError(false);
      window.location.href = '/';
      return;
    }
    setIsLoginRequestLoading(false);
    setShowLoginError(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setShowLoginError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowLoginError(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onButtonClick();
  };

  const handleEnter: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input2Ref?.current?.focus();
      }
    },
    []
  );

  return (
    // TODO: Переместить отсюда ThemeProvider выше
    <ThemeProvider theme={themeBrunoyam}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <LogoIcon />
        </header>
        <div className={styles['login-form']}>
          <h1 className={styles.title}>Вход в личный кабинет</h1>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <StyledTextField
              variant='outlined'
              label='Email'
              type='email'
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
              onKeyDown={handleEnter}
            />
            <StyledTextField
              variant='outlined'
              label='Пароль'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={styles.input}
              inputRef={input2Ref}
            />
            {showLoginError && (
              <div className={styles.error}>Неправильный email или пароль</div>
            )}
            <Button className={styles.button}>
              {isLoginRequestLoading ? (
                <CircularProgress color='info' />
              ) : (
                'Войти'
              )}
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};
