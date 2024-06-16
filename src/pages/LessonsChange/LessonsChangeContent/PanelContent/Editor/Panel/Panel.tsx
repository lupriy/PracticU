import React, { useState, useEffect } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Popper, Paper } from '@material-ui/core';
import { Range, Editor } from 'slate';

import LinkButton, {
  Button,
  isMarkActive,
  toggleMark,
  isBlockActive,
  PanelLink,
} from './components';
import s from './Panel.module.scss';

const OPTIONS = [
  {
    id: 6,
    format: 'blockquote',
    type: 'mark',
    name: 'Тег',
  },
  {
    id: 7,
    format: 'bgColor',
    type: 'mark',
    name: 'Выделить',
  },
  {
    id: 8,
    format: 'bold',
    type: 'mark',
    name: 'Bold',
  },
];

//@ts-ignore
const MarkButton = ({ format, editor, onClose, name }) => {
  return (
    <Button
      active={isMarkActive(editor, format)}
      format={format}
      //@ts-ignore
      onClick={e => {
        e.preventDefault();
        toggleMark(editor, format);
        onClose();
      }}
    >
      {name}
    </Button>
  );
};

const Panel = () => {
  const editor = useSlate();

  const [openChangeLink, setOpenChangeLink] = useState(false);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { selection } = editor;
  const id = open ? 'hovering-toolbar' : undefined;

  useEffect(() => {
    const domSelection = window.getSelection();

    if (
      !selection ||
      //@ts-ignore
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setOpen(false);
      setOpenChangeLink(false);
      return;
    }

    const getBoundingClientRect = () =>
      //@ts-ignore
      domSelection.getRangeAt(0).getBoundingClientRect();

    setOpen(true);
    setAnchorEl({
      //@ts-ignore
      clientWidth: getBoundingClientRect().width,
      clientHeight: getBoundingClientRect().height,
      getBoundingClientRect,
    });
  }, [editor, selection]);

  return (
    <>
      <Popper
        id={id}
        open={open && !openChangeLink}
        anchorEl={anchorEl}
        placement='top'
        modifiers={{
          offset: {
            enabled: true,
            offset: '0,5',
          },
        }}
      >
        <Paper className={s.panel}>
          <div className={s.content}>
            <LinkButton
              active={isBlockActive(editor, 'link')}
              editor={editor}
              showInNewTab={openChangeLink}
              setShowInput={setOpenChangeLink}
            />
            {OPTIONS.map(item => (
              <MarkButton
                key={item.id}
                editor={editor}
                onClose={() => setOpen(false)}
                {...item}
              />
            ))}
          </div>
        </Paper>
      </Popper>

      <Popper
        id={id}
        open={openChangeLink}
        anchorEl={anchorEl}
        placement='bottom'
        modifiers={{
          offset: {
            enabled: true,
            offset: '0,5',
          },
        }}
      >
        <Paper className={s.panel}>
          <PanelLink editor={editor} setShowInput={setOpenChangeLink} />
        </Paper>
      </Popper>
    </>
  );
};

export default Panel;
