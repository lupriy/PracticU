import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../PopupForm/styles.module.scss';
import { Button } from '../../../../shared/components/Button';
//import { tags as tagsList } from "../PopupForm/constants";
import { Course, api } from '../../../../api';

type TProps = {
  changedItem: Course | null;
  tags: any[];
  setChangedItem: React.Dispatch<React.SetStateAction<Course | null>>;
  setIsOpen: (state: boolean) => void;
};

export const CourseChangeModal = ({
  changedItem,
  tags,
  setChangedItem,
  setIsOpen,
}: TProps) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tagsSelect, setTagsSelect] = useState(['']);
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (changedItem) {
      const { id, name, description, tags, hours, price } = changedItem;

      setId(id);
      setName(name);
      setDesc(description);
      setTagsSelect(tags);
      setDuration(`${hours}`);
      setPrice(`${price}`);
    }
  }, [changedItem]);

  const isActive = useMemo(
    () => name && desc && tags[0] && duration && price,
    [name, desc, tags, duration, price]
  );

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const handleChangeDesc = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setDesc(value);
  };

  const handleChangeTags = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTagsSelect([value]);
  };

  const handleChangeDuration = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    const numberValue = +value;

    if (numberValue !== 0 || value === '') {
      setDuration(value);
    }
  };

  const handleChangePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    const numberValue = +value;

    if (numberValue !== 0 || value === '') {
      setPrice(value);
    }
  };

  const handleSave = async () => {
    try {
      if (changedItem) {
        const obj = {
          ...changedItem,
          name: name,
          description: desc,
          tags: tagsSelect,
          hours: +duration,
          price: +price,
        };

        await api.course.courseUpdate(id, obj);
        setChangedItem(obj);
        setIsOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles['popup-container']}>
      <span className={styles['popup-close']} onClick={() => setIsOpen(false)}>
        <CloseIcon
          style={{ color: '#9AA1B0', width: '16px', height: '16px' }}
        />
      </span>
      <h2 className={styles['popup-title']}>Изменить курс</h2>
      <TextField
        id='name'
        value={name}
        label='Название'
        variant='outlined'
        className={styles['popup-field']}
        onChange={handleChangeName}
      />
      <TextField
        id='desc'
        value={desc || ''}
        label='Описание'
        variant='outlined'
        multiline
        rows={4}
        className={styles['popup-field']}
        onChange={handleChangeDesc}
      />
      <TextField
        id='tags'
        value={tagsSelect[0] || ''}
        select
        label='Направление'
        className={styles['popup-field']}
        onChange={handleChangeTags}
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
        value={duration}
        type='number'
        label='Продолжительность, ак. ч.'
        variant='outlined'
        className={styles['popup-field']}
        onChange={handleChangeDuration}
      />
      <TextField
        id='price'
        value={price}
        type='number'
        label='Стоимость, ₽'
        variant='outlined'
        className={styles['popup-field']}
        onChange={handleChangePrice}
      />
      <Button
        onClick={handleSave}
        className={cn(styles['popup-button'], {
          [styles['popup-button-disabled']]: !isActive,
        })}
        type='secondary'
        disabled={!isActive}
      >
        Сохранить
      </Button>
    </div>
  );
};
