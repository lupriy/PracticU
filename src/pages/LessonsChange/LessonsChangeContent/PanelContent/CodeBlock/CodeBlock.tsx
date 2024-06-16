//TODO: если файл используется, то подчистить его от ts-ignore

import React, { useCallback, useEffect, useState } from 'react';
//@ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter/';
//@ts-ignore
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Autocomplete, TextareaAutosize, TextField } from '@mui/material';
import { TDataChange } from '../../types';
import { Trashcan } from '../Media/Photo/icons';
import s from './CodeBlock.module.scss';

type TProps = {
  id: number;
  data: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
};

const LANGUAGES_OPTIONS = SyntaxHighlighter.supportedLanguages;

export const CodeBlock = ({ id, data, setData }: TProps) => {
  // @ts-ignore
  const { language: initialLanguage } = data;
  // @ts-ignore
  const [code, setCode] = useState(data[0]?.text ?? '');
  const [language, setLanguage] = useState(initialLanguage ?? 'python');

  useEffect(() => {
    setData(prevState => ({
      ...prevState,
      [id]: { ...prevState[id], value: code, language },
    }));
  }, [id, code, language, setData]);

  const handleDelete = useCallback(() => {
    setData(state => {
      const newState = state;
      delete newState[id];
      return { ...newState };
    });
  }, [id, setData]);

  //@ts-ignore
  const handleChange = event => {
    setCode(event.target.value);
  };

  return (
    <div>
      <div className={s.block}>
        <TextareaAutosize
          value={code}
          onChange={handleChange}
          className={s.textarea}
          minRows={3}
          placeholder='Введите код'
        />
        <Autocomplete
          value={language}
          onChange={(e: any, newValue: string | null) => setLanguage(newValue)}
          options={LANGUAGES_OPTIONS}
          renderInput={params => <TextField {...params} label='Язык' />}
          className={s.languageField}
          size='small'
        />
      </div>

      <div className={s.codeBlock}>
        <button className={s.closeButton} onClick={handleDelete}>
          <Trashcan />
        </button>
        <SyntaxHighlighter
          language={language}
          className={s.editor}
          style={docco}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
