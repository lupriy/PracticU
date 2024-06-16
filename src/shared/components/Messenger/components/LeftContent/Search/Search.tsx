import React, { useRef, useState } from 'react';

import { SearchIcon } from './SearchIcon';
import s from './styles.module.scss';

export const Search = () => {
  const ref: React.LegacyRef<HTMLInputElement> = useRef(null);
  const [valueSearch, setValueSearch] = useState('');

  const handleClick = () => {
    ref.current?.focus();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget;
    setValueSearch(value);
  };

  return (
    <div className={s.block} onClick={handleClick}>
      <SearchIcon />
      <input
        className={s.input}
        ref={ref}
        placeholder='Найти'
        value={valueSearch}
        onChange={handleChange}
      />
    </div>
  );
};
