import { useRef, useState } from 'react';
import { Editor, Transforms, Range, Element } from 'slate';

import { isBlockActive, Button } from './Button';

//@ts-ignore
export const removeLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      //@ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

//@ts-ignore
const createLinkNode = (href, showInNewTab, text) => ({
  type: 'link',
  href,
  target: '_blank', //showInNewTab ? "_blank" : "_self",
  children: [{ text }],
});

//@ts-ignore
export const insertLink = (editor, { url, showInNewTab }) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, showInNewTab, 'Link');
  if (!!selection) {
    const [parent] = Editor.parent(editor, selection.focus.path);
    //@ts-ignore
    if (parent.type === 'link') {
      removeLink(editor);
    }

    if (editor.isVoid(parent)) {
      Transforms.insertNodes(
        editor,
        //@ts-ignore
        { type: 'paragraph', children: [link] }
        /*  {
          at: Path.next(parentPath),
          select: true,
        } */
      );
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
    }
  } else {
    //@ts-ignore
    Transforms.insertNodes(editor, { type: 'paragraph', children: [link] });
  }
};

//////////////////////////////////////////////////

//@ts-ignore
const LinkButton = ({ active, editor, showInNewTab, setShowInput }) => {
  const linkInputRef = useRef(null);
  const [, setSelection] = useState();

  const toggleLink = () => {
    setSelection(editor.selection);
    //@ts-ignore
    setShowInput(prev => !prev);
  };

  return (
    <div ref={linkInputRef} className='popup-wrapper'>
      <Button
        active={isBlockActive(editor, 'link')}
        format={'link'}
        onClick={toggleLink}
      >
        <p>ссылка</p>
      </Button>
    </div>
  );
};

export default LinkButton;
