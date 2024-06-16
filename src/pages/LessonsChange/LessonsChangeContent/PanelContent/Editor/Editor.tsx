import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import Panel from './Panel';
import { TDataChange } from '../../types';
import { getMarked, getBlock, withLinks } from './components';
import s from './Editor.module.scss';

type TProps = {
  type?: string;
  initialValue: string;
  id: number;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  handleDeleteclick?: () => void;
};

//@ts-ignore
const Element = props => {
  return getBlock(props);
};

//@ts-ignore
const Leaf = props => {
  return <span {...props.attributes}>{getMarked(props)}</span>;
};

/* const Leaf = ({ attributes, children, leaf }, props) => {
  children = getMarked(leaf, children, { ...props });
  return <span {...attributes}>{children}</span>;
}; */

const Editor = ({
  type = '',
  //@ts-ignore
  initialValue = null,
  id,
  setData,
  handleDeleteclick,
}: TProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editor] = useState(() =>
    withReact(withHistory(withLinks(createEditor())))
  );

  const [value, setValue] = useState(null);

  useEffect(() => {
    if (initialValue) {
      //@ts-ignore
      setValue(initialValue);
    } else {
      //@ts-ignore
      setValue([
        {
          type: 'paragaph',
          children: [{ text: '' }],
        },
      ]);
    }
  }, [initialValue]);

  //@ts-ignore
  const handleEditorChange = newValue => {
    setValue(newValue);
    setData(state => ({ ...state, [id]: { ...state[id], value: newValue } }));
  };

  const handleBackspace: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Backspace') {
      const { selection } = editor;
      const { focus, anchor } = selection;

      if (
        selection &&
        focus.offset === 0 &&
        anchor.offset === 0 &&
        //@ts-ignore
        !value[0]?.children[0]?.text
      ) {
        setValue(null);
        //@ts-ignore
        handleDeleteclick();
      }
    }
  };

  const renderElement = useCallback(
    props => <Element type={type} initialValue={initialValue} {...props} />,
    [type, initialValue]
  );

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    value && (
      <Slate editor={editor} value={value} onChange={handleEditorChange}>
        <Panel />

        <div ref={ref} className={s.editor}>
          {type === 'orderedList' && (
            <ol style={{ width: '734px', marginLeft: '15px' }}>
              <Editable
                placeholder={'Начните печатать'}
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                spellCheck={false}
                onKeyDown={handleBackspace}
              />
            </ol>
          )}
          {type === 'list-item' && (
            <ul style={{ width: '734px', marginLeft: '15px' }}>
              <Editable
                placeholder={'Начните печатать'}
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                spellCheck={false}
                onKeyDown={handleBackspace}
              />
            </ul>
          )}
          {type !== 'list-item' && type !== 'orderedList' && (
            <Editable
              placeholder={'Начните печатать'}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              spellCheck={false}
              onKeyDown={handleBackspace}
            />
          )}
        </div>
      </Slate>
    )
  );
};

export default Editor;
