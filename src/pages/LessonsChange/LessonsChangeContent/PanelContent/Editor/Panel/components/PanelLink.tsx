import React, { useState } from 'react';
import { Transforms } from 'slate';

import { insertLink } from './LinkButton';
import s from './Button.module.scss';

//@ts-ignore
export const PanelLink = ({ editor, setShowInput }) => {
  const [url, setUrl] = useState('');
  const [showInNewTab, setShowInNewTab] = useState(true);
  const [selection /* setSelection */] = useState();
  const [disabled, setDisabled] = useState(true);

  const handleInsertLink = () => {
    //@ts-ignore
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl('');
    //@ts-ignore
    setShowInput(prev => !prev);
    setShowInNewTab(false);
  };

  //@ts-ignore
  const handleInputChange = ({ target }) => {
    /*  if (target.type === "checkbox") {
      setShowInNewTab((prev) => !prev);
    } else { */
    const { value } = target;
    const isValidate = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
    setUrl(target.value);
    setDisabled(!isValidate);
    //}
  };

  return (
    <>
      <input
        className={s.inputLink}
        placeholder='Вставьте ссылку'
        value={url}
        onChange={handleInputChange}
      />
      <button
        className={s.buttonLink}
        disabled={disabled}
        onClick={handleInsertLink}
      >
        добавить
      </button>
      {/* <label>
        <input
          type="checkbox"
          checked={showInNewTab}
          onChange={handleInputChange}
        />
        <span style={{ fontSize: "0.8em" }}>Open in new tab</span>
      </label> */}
    </>
  );
};
