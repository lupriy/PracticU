import { useMemo } from 'react';

import s from './DragAndDropCursor.module.scss';
import { DocsIcon } from '../icons';
import { TMousePos } from '../types';

const CURSOR_WIDTH = 55;
const CURSOR_HEIGHT = 30;

type TProps = {
  mousePos: TMousePos;
  filesCount: number;
};

export const DragAndDropCursor = ({ mousePos, filesCount }: TProps) => {
  const position = useMemo(
    () => ({
      top: mousePos.y - CURSOR_HEIGHT,
      left: mousePos.x - CURSOR_WIDTH,
    }),
    [mousePos]
  );

  return (
    <div className={s.cursor} style={position}>
      <div className={s.count}>{filesCount}</div>
      <div className={s.icon}>
        <DocsIcon />
      </div>
    </div>
  );
};
