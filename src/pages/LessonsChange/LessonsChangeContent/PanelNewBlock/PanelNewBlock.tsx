import React, { useEffect, useState, useMemo, useRef } from 'react';

import { Column } from './Column';
import { options } from './options';
import { Plus, Dots } from './icons';
import s from './PanelNewBlock.module.scss';

type Params = {
  refBlock: React.RefObject<HTMLDivElement>;
  refInput: React.RefObject<HTMLInputElement>;
  toggleOpen: (state: boolean) => void;
};

const useOutsideAlerter = ({ refBlock, refInput, toggleOpen }: Params) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refBlock.current &&
        //@ts-ignore
        !refBlock.current.contains(event.target) &&
        refInput.current &&
        //@ts-ignore
        !refInput.current.contains(event.target)
      ) {
        toggleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refBlock, refInput, toggleOpen]);
};

type TProps = {
  isOpen: boolean;
  refContent: React.RefObject<HTMLDivElement>;
  toggleOpen: (state: boolean) => void;
  setNewBlockId: React.Dispatch<React.SetStateAction<string>>;
};

const PanelNewBlock = ({
  isOpen,
  refContent,
  toggleOpen,
  setNewBlockId,
}: TProps) => {
  const refBlock = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  useOutsideAlerter({ refBlock, refInput, toggleOpen });

  const [value, setValue] = useState('');
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    const isActive = refContent?.current && refBlock?.current && isOpen;

    if (isActive) {
      const heightContent = refContent.current.clientHeight;
      const heightBlock = refBlock.current?.clientHeight;

      if (heightContent < heightBlock) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    }
  }, [refContent, refBlock, isOpen]);

  const optionsFilter = useMemo(() => {
    const { textBlocks, lessonStructure, media, tasks } = options;

    const textBlocksFilter = textBlocks.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    const lessonStructureFilter = lessonStructure.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    const mediaFilter = media.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    const tasksFilter = tasks.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    const obj: any = {};

    if (textBlocksFilter.length) obj['textBlocks'] = textBlocksFilter;
    if (lessonStructureFilter.length)
      obj['lessonStructure'] = lessonStructureFilter;
    if (mediaFilter.length) obj['media'] = mediaFilter;
    if (tasksFilter.length) obj['tasks'] = tasksFilter;

    return obj;
  }, [value]);

  const handleOpenPanel = () => toggleOpen(true);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setValue(value);
  };

  const style = isTop ? { bottom: 0, top: '44px' } : {};

  return (
    <div style={{ position: 'relative' }}>
      {isOpen && (
        <div className={s.blockItems} style={style} ref={refBlock}>
          {optionsFilter.textBlocks && (
            <Column
              id={'textBlocks'}
              list={optionsFilter.textBlocks}
              setNewBlockId={setNewBlockId}
            />
          )}
          <div className={s.blockItems1}>
            <div>
              {optionsFilter.lessonStructure && (
                <Column
                  id={'lessonStructure'}
                  list={optionsFilter.lessonStructure}
                  setNewBlockId={setNewBlockId}
                />
              )}
              {optionsFilter.media && (
                <Column
                  id={'media'}
                  list={optionsFilter.media}
                  setNewBlockId={setNewBlockId}
                />
              )}
            </div>
            {optionsFilter.tasks && (
              <Column
                id={'tasks'}
                list={optionsFilter.tasks}
                setNewBlockId={setNewBlockId}
              />
            )}
          </div>
        </div>
      )}
      <div className={s.block}>
        <button className={s.button1}>
          <Dots />
        </button>
        <button className={s.button2} onClick={handleOpenPanel}>
          <Plus />
        </button>

        {isOpen && (
          <input
            ref={refInput}
            className={s.input}
            placeholder='Поиск по блокам'
            value={value}
            onChange={handleChangeValue}
          />
        )}
      </div>
    </div>
  );
};

export default PanelNewBlock;
