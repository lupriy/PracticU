import { Editor, Element as SlateElement } from 'slate';

import s from './Button.module.scss';

//@ts-ignore
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);

  //@ts-ignore
  return marks ? marks[format] === true : false;
};

//@ts-ignore
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

//@ts-ignore
export const Button = props => {
  const { children, format, active, ...rest } = props;

  return (
    <button
      /* className={active ? "btnActive" : ""} */
      className={s.button}
      title={format}
      {...rest}
      /*  style={{ width: "80px", height: "20px", margin: "0 2px" }} */
    >
      {children}
    </button>
  );
};

//@ts-ignore
export const isBlockActive = (editor, format) => {
  //@ts-ignore
  const [match] = Editor.nodes(editor, {
    match: n =>
      //@ts-ignore
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};
