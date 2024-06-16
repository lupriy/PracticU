import { useEffect, useState } from 'react';
import cn from 'classnames';
import { TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../../../api';
import { PopupFormState, PopupFormProps } from './types';
import { preventBodyScrolling } from '../../../../shared/utils';
import styles from './styles.module.scss';
import { Button } from '../../../../shared/components/Button';
import { initialState } from './constants';

export const PopupForm = ({
  tags,
  setPopupOpened,
}: PopupFormProps & { tags: { key: string; name: string }[] }) => {
  const [popupFormState, setPopupFormState] =
    useState<PopupFormState>(initialState);
  const [isValid, setValid] = useState(false);

  const handleClosePopup = () => {
    setPopupOpened(false);
    preventBodyScrolling(false);
  };

  const handleChangeField = <T,>(value: T, fieldName: string) => {
    setPopupFormState(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const sendNewCourse = async () => {
    try {
      const response = await api.course.courseCreate({
        name: popupFormState?.name ?? '',
        tags: popupFormState?.tags,
        hours: popupFormState?.duration ?? 0,
        price: popupFormState?.price,
        description: popupFormState?.desc,
      });

      if (response.ok) {
        handleClosePopup();
        setPopupFormState(initialState);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSavePopup = () => {
    if (isValid) {
      sendNewCourse();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (
      popupFormState?.name &&
      popupFormState?.desc &&
      popupFormState?.tags?.length &&
      popupFormState?.duration &&
      popupFormState?.price
    ) {
      setValid(true);
    }
  }, [popupFormState]);

  return (
    <form className={styles['popup-container']} onSubmit={handleSubmit}>
      <span className={styles['popup-close']} onClick={handleClosePopup}>
        <CloseIcon
          style={{ color: '#9AA1B0', width: '16px', height: '16px' }}
        />
      </span>
      <h2 className={styles['popup-title']}>Новый курс</h2>
      <TextField
        id='name'
        value={popupFormState.name || ''}
        label='Название'
        variant='outlined'
        className={styles['popup-field']}
        onChange={event => handleChangeField(event.target.value, 'name')}
      />
      <TextField
        id='desc'
        value={popupFormState.desc || ''}
        label='Описание'
        variant='outlined'
        multiline
        rows={4}
        className={styles['popup-field']}
        onChange={event => handleChangeField(event.target.value, 'desc')}
      />
      <TextField
        id='tags'
        select
        label='Направление'
        value={popupFormState.tags ? popupFormState.tags[0] : ''}
        className={styles['popup-field']}
        onChange={event => handleChangeField([event.target.value], 'tags')}
      >
        {tags.map(({ key, name }) => (
          <MenuItem
            className={styles['popup-field-item']}
            key={key}
            value={key}
          >
            {name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id='duration'
        value={popupFormState.duration || ''}
        type='number'
        label='Продолжительность, ак. ч.'
        variant='outlined'
        className={styles['popup-field']}
        onChange={event => handleChangeField(event.target.value, 'duration')}
      />
      <TextField
        id='price'
        value={popupFormState.price || ''}
        type='number'
        label='Стоимость, ₽'
        variant='outlined'
        className={styles['popup-field']}
        onChange={event => handleChangeField(event.target.value, 'price')}
      />
      <Button
        onClick={handleSavePopup}
        className={cn(styles['popup-button'], {
          [styles['popup-button-disabled']]: !isValid,
        })}
        type='secondary'
        disabled={!isValid}
      >
        Сохранить
      </Button>
    </form>
  );
};
