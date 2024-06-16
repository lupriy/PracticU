import React, { useCallback, useEffect, useState } from 'react';

import { api } from '../../../../api/index';
import { PasswordInput, SuccessAlert } from '../';
import { Button } from '../../../../shared/components/Button';
import s from './PasswordChange.module.scss';

export const PasswordChange = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);
  const [isNewPasswordError, setIsNewPasswordError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { currentPassword, newPassword, newPasswordRepeat } = passwords;
  const isSendButtonDisabled = !(
    newPassword &&
    currentPassword &&
    newPasswordRepeat
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(id);
  }, [isSuccess]);

  const handlePasswordChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const {
        target: { name, value },
      } = evt;
      setPasswords({
        ...passwords,
        [name]: value,
      });
      setIsCurrentPasswordError(false);
      setIsNewPasswordError(false);
      setErrorMessage('');
    },
    [passwords]
  );

  const checkPasswordsIsEqual = () => {
    if (newPassword !== newPasswordRepeat) {
      setErrorMessage('Пароли не совпадают');
      setIsNewPasswordError(true);
      return false;
    }

    return true;
  };

  const handleSaveBtn = () => {
    const isPasswordsEqual = checkPasswordsIsEqual();

    const asyncEffect = async () => {
      try {
        const data = {
          current_password: currentPassword,
          new_password: newPassword,
        };

        await api.me.meChangePasswordCreate(data);
        setIsSuccess(true);
      } catch (e: any) {
        if (e.status === 403) {
          setIsCurrentPasswordError(true);
          setErrorMessage('Неправильный пароль.');
        }
        console.error(e);
      }
    };

    if (isPasswordsEqual) {
      asyncEffect();
    }
  };

  return (
    <>
      <h1>Смена пароля</h1>
      <div className={s.text}>
        Пожалуйста, укажите текущий пароль и придумайте новый.
      </div>
      <div className={s.block}>
        <PasswordInput
          label='Текущий пароль'
          password={currentPassword}
          handlePasswordChange={handlePasswordChange}
          name='currentPassword'
          isError={isCurrentPasswordError}
        />
        <PasswordInput
          label='Новый пароль'
          password={newPassword}
          handlePasswordChange={handlePasswordChange}
          name='newPassword'
          isError={isNewPasswordError}
        />
        <PasswordInput
          label='Повторите новый пароль'
          password={newPasswordRepeat}
          handlePasswordChange={handlePasswordChange}
          name='newPasswordRepeat'
          isError={isNewPasswordError}
        />
      </div>
      {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}

      <Button
        type='primary'
        children='Сохранить'
        disabled={isSendButtonDisabled}
        color='brunoyam'
        className={s.btn}
        onClick={handleSaveBtn}
      />

      {isSuccess && <SuccessAlert text='Новый пароль сохранён' />}
    </>
  );
};
