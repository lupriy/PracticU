import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { TextField, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '../../shared/components/Navigation';
import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../shared/theme/mediaQuery';
import { Button } from '../../shared/components/Button';
import userPhotoPlaceholder from '../../shared/icons/userPhotoPlaceholder.svg';
import { PadlockEmpty } from '../../shared/icons/padlockEmpty';
import closeIcon from '../../shared/icons/closeBlack.svg';
import { PopupProfile, SuccessAlert, PasswordChange } from './components';
import { api } from '../../api/index';
import { userAvatarSelector } from '../../redux/userAvatar/selectors';
import {
  deleteUserAvatar,
  postUserAvatar,
} from '../../redux/userAvatar/thunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import s from './Profile.module.scss';

const { meRetrieve, meUpdate } = api.me;

const IS_PROFILE = true;
const TEXT_FIELD_DEFAULT_WIDTH = 352;
const MAX_AVATAR_SIZE_MB = 5;
const KILO_DIVIDER = 1024;
const TIME = 2000;

export const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userID, setUserID] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scaleImg, setScaleImg] = useState(1);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isFileSizeBigger, setIsFileSizeBigger] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const userAvatar = useAppSelector(userAvatarSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const PAGE_CONTAINER_STYLES = cn(
    { [s['page-container']]: matchesDesktop },
    {
      [s['page-container-tablet']]: matchesTablet && !matchesDesktop,
    },
    {
      [s['page-container-mobile']]: matchesMobile && !matchesTablet,
    }
  );

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const res = await meRetrieve();
        const {
          data: { first_name, last_name, phone, email, id },
        } = res;
        setFirstName(first_name || '');
        setLastName(last_name || '');
        setEmail(email || '');
        setPhone(phone);
        setUserID(id);
      } catch (e) {
        console.error(e);
      }
    };
    asyncEffect();
  }, []);

  const handleAddButton = () => {
    inputRef?.current?.click();
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.currentTarget;
    setIsFileSizeBigger(false);

    if (files) {
      const selectedFile = files[0];

      const fileSizeInMB = selectedFile?.size / (KILO_DIVIDER * KILO_DIVIDER);

      if (fileSizeInMB > MAX_AVATAR_SIZE_MB) {
        setIsFileSizeBigger(true);
      } else {
        setSelectedFile(selectedFile);
        setIsModalOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleDeleteBtn = () => {
    dispatch(deleteUserAvatar());
    setSelectedFile(null);
  };

  const handleChangePasswordClick = () => {
    setIsPasswordChange(true);
  };

  const handleChangeEmail: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;

    setEmailError(false);
    setEmail(value);
  };

  const handleChangePhone: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;

    setPhoneError(false);
    setPhone(value);
  };

  const handleBackPage = useCallback(() => {
    setIsPasswordChange(false);
  }, []);

  const handleCloseProfile = () => {
    navigate('/');
  };

  const handleSaveButtonClick = useCallback(async () => {
    try {
      const dataMe = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        city: null,
      };
      const dataAvatar = {
        id: userID,
        filename: selectedFile,
        content_type: 'multipart/form-data',
      };

      await meUpdate(dataMe);
      dispatch(postUserAvatar(dataAvatar));

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, TIME);
    } catch (e: any) {
      const { error } = e;
      error?.email && setEmailError(error.email[0]);
      error?.phone && setPhoneError(error.phone[0]);
      console.error(e);
    }
  }, [email, firstName, lastName, phone, userID, selectedFile, dispatch]);

  const imageSrc = useMemo(() => {
    if (!userAvatar || selectedFile) {
      const image = selectedFile
        ? URL.createObjectURL(selectedFile)
        : userPhotoPlaceholder;
      return image;
    }
    return userAvatar;
  }, [selectedFile, userAvatar]);

  if (!isPasswordChange) {
    return (
      <div>
        <Navigation isProfile={IS_PROFILE} />
        <div className={PAGE_CONTAINER_STYLES}>
          <img
            src={closeIcon}
            alt='close'
            className={s.closeIcon}
            onClick={handleCloseProfile}
          />

          <h1>Личный кабинет</h1>
          <div className={s.description}>
            Заполните информацию о себе чтобы вам было удобнее пользоваться
            платформой.
          </div>
          <div className={s.photoBlock}>
            <div
              className={s.photoWrapper}
              style={{
                width: matchesDesktop ? '96px' : '80px',
                height: matchesDesktop ? '96px' : '80px',
              }}
            >
              <img
                src={imageSrc}
                alt='profile'
                style={{
                  transform: `scale(${scaleImg})`,
                  width: matchesDesktop ? '96px' : '80px',
                  height: matchesDesktop ? '96px' : '80px',
                }}
                className={s.photo}
              />
              <div className={s.overlay} />
            </div>
            <button className={s.button} onClick={handleAddButton}>
              {!userAvatar ? 'Добавить фото' : 'Изменить'}
            </button>
            <input
              type='file'
              ref={inputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept='image/jpeg,image/png,image/heic'
              maxLength={1000000}
            />

            {(selectedFile || userAvatar) && (
              <button className={s.deleteBtn} onClick={handleDeleteBtn}>
                Удалить
              </button>
            )}
          </div>
          {isFileSizeBigger && (
            <div className={s.errorMessage}>Выберите фото меньше 5мб</div>
          )}

          <div className={s.form}>
            <TextField
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              label='Имя'
              variant='outlined'
              name='name'
              sx={{ width: TEXT_FIELD_DEFAULT_WIDTH }}
            />
            <TextField
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              label='Фамилия'
              variant='outlined'
              name='name'
              sx={{ width: TEXT_FIELD_DEFAULT_WIDTH }}
            />
            <TextField
              value={email}
              onChange={handleChangeEmail}
              label='Email'
              variant='outlined'
              name='email'
              sx={{ width: TEXT_FIELD_DEFAULT_WIDTH }}
              error={emailError}
              helperText={emailError}
            />
            <TextField
              value={phone}
              onChange={handleChangePhone}
              label='Номер телефона'
              variant='outlined'
              name='tel'
              sx={{ width: TEXT_FIELD_DEFAULT_WIDTH }}
              placeholder='+7 (900) 000-00-00'
              error={phoneError}
              helperText={phoneError}
            />
            <Button
              type='primary'
              children='Сохранить'
              disabled={false}
              color='brunoyam'
              onClick={handleSaveButtonClick}
            />
            <button className={s.link} onClick={handleChangePasswordClick}>
              <PadlockEmpty />
              Сменить пароль
            </button>
          </div>
          {isModalOpen && (
            <PopupProfile
              isOpen={isModalOpen}
              scale={scaleImg}
              selectedFile={selectedFile}
              setIsOpen={setIsModalOpen}
              setScale={setScaleImg}
              handleModalClose={handleModalClose}
            />
          )}
          {isSuccess && <SuccessAlert text='Изменения сохранены' />}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation
          isProfile={IS_PROFILE}
          isChangePassword={true}
          moduleTitle='Личный кабинет'
          handleBackPage={handleBackPage}
        />
        <div className={PAGE_CONTAINER_STYLES}>
          <PasswordChange />
        </div>
      </div>
    );
  }
};
