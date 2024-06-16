import { useRef, useState } from 'react';
import { useFocused, useSelected, useSlateStatic } from 'slate-react';
import { Editor, Transforms, Element } from 'slate';

import style from './Link.module.scss';
import s from '../Editor.module.scss';

//@ts-ignore
export const withLinks = editor => {
  const { isInline } = editor;

  //@ts-ignore
  editor.isInline = element =>
    element.type === 'link' ? true : isInline(element);

  return editor;
};

//@ts-ignore
export const removeLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      //@ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

//@ts-ignore
export const Link = props => {
  const { /* attributes, element, */ children } = props;
  const ref = useRef(null);
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  const [isFocus, setIsFocus] = useState(false);

  const handleMouseOver = () => setIsFocus(true);
  const handleMouseOut = () => setIsFocus(false);
  const handleDelete = () => removeLink(editor);

  const href = children.props.parent.href;
  const isActive = (selected && focused) || isFocus;

  return (
    <>
      <div>
        <a
          ref={ref}
          className={s.link}
          href={children.props.parent.href}
          target='_blank'
          rel='noreferrer'
        >
          {children}
        </a>
        {isActive && (
          <div
            className={style.linkBlock}
            contentEditable={false}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{ display: 'flex' }}
          >
            <a
              className={style.link}
              href={href}
              target='_blank'
              rel='noreferrer'
            >
              {href}
            </a>
            <button className={style.button} onClick={handleDelete}>
              Удалить
            </button>
          </div>
        )}
      </div>
    </>
  );
};
