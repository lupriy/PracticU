import React, { useRef, useState, useCallback } from 'react';

import Editor from './Editor';
import { Photo, Video } from './Media';
import { TDataChange } from '../types';
import { OpenAnswer, SingleChoice } from './Tasks';
import { ImportantThought } from './ImportantThought';
import { StyledContextMenu } from '../../../../shared/components/mui-styled/ContextMenu';
import s from './PanelContent.module.scss';
import { Dots, Plus } from '../../LessonsChangeContent/PanelNewBlock/icons';
import { LessonSeparator } from './Structure/LessonSeparator';
import { CodeBlock } from './CodeBlock';
import { TestTaskOption } from 'api/lesson-content/lessonContentType';

type TProps = {
  id: number;
  position: number;
  value: string;
  type: string;
  courseTag: string;
  draggedItemId: number;
  content: string;
  options: TestTaskOption[];
  isTaskRequired: boolean;
  dataArray: TDataChange;
  header: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  setDraggedItemId: React.Dispatch<React.SetStateAction<number>>;
};

export const PanelContent = ({
  id,
  //position,
  type,
  value,
  header,
  courseTag,
  isTaskRequired,
  dataArray,
  draggedItemId,
  content,
  options,
  setData,
  setDraggedItemId,
}: TProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    setTooltipVisible(true);
  }

  function handleMouseLeave() {
    setTooltipVisible(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    // e.currentTarget.style.boxShadow = '#c8c8c8 1px 2px 6px';
    e.currentTarget.style.boxShadow =
      ' 0px -4px 0px -1px rgba(106, 168, 255, 0.47) inset';
  }

  function handleDragLeave(e: {
    currentTarget: { style: { boxShadow: string } };
  }) {
    e.currentTarget.style.boxShadow = 'none';
  }

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    setDraggedItemId(id);
  };

  function handleDragEnd(e: {
    currentTarget: { style: { boxShadow: string } };
  }) {
    e.currentTarget.style.boxShadow = 'none';
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropId: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.boxShadow = 'none';

    if (dropId && draggedItemId && dropId !== draggedItemId && dataArray) {
      const arr = Object.entries(dataArray).map(([_, value]) => value);

      const dragElementIndex = arr.findIndex(elem => elem.id === draggedItemId);
      const dropIndex = arr.findIndex(elem => elem.id === dropId);
      const elem = arr.splice(dragElementIndex, 1);

      arr.splice(dropIndex, 0, elem[0]);

      setData(arr);
    }
  };

  const handleDrag = () => {
    setTooltipVisible(false);
  };

  const handleMenuButtonClick = () => {
    setTooltipVisible(false);
    setIsContextMenuVisible(prev => !prev);
  };

  const handleLeaveBlock = () => {
    setIsContextMenuVisible(false);
  };

  const handleDeleteclick = useCallback(() => {
    setData(state => {
      const newState = { ...state };
      delete newState[id];
      return newState;
    });
  }, [id, setData]);

  const handleCopyClick = useCallback(() => {
    setData(prevState => {
      const newID = Math.random();
      const copyElement = { ...prevState[id], id: newID };

      return {
        ...prevState,
        [newID]: copyElement,
      };
    });
  }, [id, setData]);

  const CONTEXT_MENU_ITEMS = [
    { content: 'Дублировать', onClick: handleCopyClick, iconName: 'duplicate' },
    { content: 'Удалить', onClick: handleDeleteclick, iconName: 'delete' },
  ];

  return (
    <>
      {id && (
        <div className={s.block} ref={blockRef} onMouseLeave={handleLeaveBlock}>
          <div className={s.movingButtons}>
            <button
              className={s.button1}
              draggable
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onClick={handleMenuButtonClick}
            >
              <Dots />
            </button>
            {isTooltipVisible && (
              <div className={s.tooltip}>Зажмите чтобы перетащить блок</div>
            )}
            {isContextMenuVisible && (
              <StyledContextMenu
                list={CONTEXT_MENU_ITEMS}
                className={s.contextMenu}
              />
            )}
            <button className={s.button2}>
              <Plus />
            </button>
          </div>
          <div
            className={s.contentBlock}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, id)}
          >
            {type === 'paragaph' && (
              <Editor
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'unnumberedList' && (
              <Editor
                type='list-item'
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'numberedList' && (
              <Editor
                type='orderedList'
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'h1' && (
              <Editor
                type='headingOne'
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'h2' && (
              <Editor
                type='headingTwo'
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'h3' && (
              <Editor
                type='headingThree'
                initialValue={value}
                id={id}
                setData={setData}
                handleDeleteclick={handleDeleteclick}
              />
            )}
            {type === 'photo' && (
              <Photo id={id} data={value} setData={setData} />
            )}
            {type === 'video' && (
              <Video id={id} data={value} setData={setData} />
            )}
            {type === 'openAnswer' && header !== undefined && (
              <OpenAnswer
                id={id}
                data={value}
                header={header}
                setData={setData}
                isRequired={isTaskRequired || false}
              />
            )}
            {type === 'openAnswerTask' && (
              <OpenAnswer
                id={id}
                data={value}
                header={header}
                setData={setData}
                isRequired={isTaskRequired || false}
              />
            )}
            {type === 'importantThought' && (
              <ImportantThought
                id={id}
                header={header}
                value={value}
                courseTag={courseTag}
                setData={setData}
              />
            )}
            {type === 'singleChoice' && (
              <SingleChoice
                id={id}
                content={content}
                header={header || ''}
                setData={setData}
                options={options}
              />
            )}
          </div>
        </div>
      )}
      {type === 'separator' && (
        <LessonSeparator
          id={id}
          initialValue={value}
          setData={setData}
          courseTag={courseTag}
        />
      )}
      {/* TODO: удалить не используемый код */}
      {type === 'code' && <CodeBlock id={id} data={value} setData={setData} />}
    </>
  );
};
