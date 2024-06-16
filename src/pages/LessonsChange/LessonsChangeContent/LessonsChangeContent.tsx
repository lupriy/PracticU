import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'react-use';

import { PanelContent } from './PanelContent';
import PanelNewBlock from './PanelNewBlock';
import { IDataCourse } from '../../Modules/Modules';
import { useFormatMarkdownInSlate } from '../hooks';
import { TDataChange } from './types';
import { Content as TContent } from '../../../api/lesson-content/lessonContentType';
import { RadioButtons } from './components';
import { useGetQueryParameter } from '../../../shared/hooks';
import {
  QUERY_LESSON_ID,
  QUERY_MODULE_ID,
} from '../../../shared/constants/queries';
import styles from './LessonsChangeContent.module.scss';

interface IProps {
  dataCourse: IDataCourse;
  dataContent: TContent;
  dataChange: TDataChange;
  aheadValue: string;
  setAheadValue: React.Dispatch<React.SetStateAction<string>>;
  setDataChange: React.Dispatch<React.SetStateAction<TDataChange>>;
}

export const LessonsChangeContent = ({
  dataCourse,
  dataContent,
  dataChange,
  aheadValue,
  setAheadValue,
  setDataChange,
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const idLesson = useGetQueryParameter({ query: QUERY_LESSON_ID });
  const idModule = useGetQueryParameter({ query: QUERY_MODULE_ID });

  const { formatRes } = useFormatMarkdownInSlate();

  const [isOpenPanelNewBlock, toggleOpenPanelNewBlock] = useToggle(false);

  const [title, setTitle] = useState('');
  const [newBlockId, setNewBlockId] = useState('');
  const [draggedItemId, setDraggedItemId] = useState(0);

  const arrayDataChange = useMemo(
    () => Object.values(dataChange),
    [dataChange]
  );

  const lengthDataChange = useMemo(
    () => arrayDataChange.length,
    [arrayDataChange]
  );

  const module = useMemo(() => {
    if (idModule) {
      const module = dataCourse.modules.find(item => item.id === +idModule);

      return module;
    }
  }, [dataCourse, idModule]);

  const lesson = useMemo(() => {
    if (module && idLesson) {
      const lesson = module.lessons.find(item => item.id === +idLesson);

      return lesson;
    }
  }, [idLesson, module]);

  const courseTags = useMemo(() => dataCourse.tags[0], [dataCourse]);

  useEffect(() => {
    setTitle(lesson?.name ?? '');
  }, [lesson]);

  useEffect(() => {
    if (dataContent) {
      const dataContentObj = dataContent.reduce((obj, item, index) => {
        //@ts-ignore
        const { type, isImportant } = item;

        if (type === 'text') {
          if (isImportant) {
            const id = Math.random();
            const textFormat = formatRes(`${item.text}`);

            let header = '';
            let value = '';

            textFormat?.forEach((item: any) => {
              const text = item?.children?.[0]?.text;

              if (item.type === 'h3') {
                if (header.length) {
                  header += '\n' + text;
                } else {
                  header = text;
                }
              } else if (item.type === 'paragaph') {
                if (value.length) {
                  value += '\n' + text;
                } else {
                  value = text;
                }
              }
            });

            return {
              ...obj,
              [id]: {
                id,
                type: 'importantThought',
                header,
                value: value,
                isImportant: true,
              },
            };
          } else {
            //const id = Math.random();
            const position = index + 1;
            const textFormat = formatRes(`${item.text}`);

            //@ts-ignore
            const objFormat = textFormat.reduce((obj, item) => {
              const { type, children, language } = item;
              const id = Math.random();

              //@ts-ignore
              const newChildren = children?.map(item => {
                const { type } = item;

                if (type === 'link') {
                  return { ...item, href: item.link };
                }

                return item;
              });

              if (type === 'unnumberedList' || type === 'numberedList') {
                return {
                  ...obj,
                  [id]: {
                    id,
                    position,
                    type: type,
                    value: children, //newChildren
                  },
                };

                //временное решение от сюда
              } else if (type === 'photo') {
                return {
                  ...obj,
                  [id]: { id, type, position, value: item.source },
                };
                //до сюда
              } else if (type === 'code') {
                return {
                  ...obj,
                  [id]: {
                    id,
                    position,
                    value: { ...children, language },
                    language,
                    type: 'code',
                  },
                };
              }

              return {
                ...obj,
                [id]: {
                  id,
                  position,
                  type: type,
                  value: [
                    {
                      type,
                      children: newChildren,
                    },
                  ],
                },
              };
            }, {});

            return {
              ...obj,
              ...objFormat,
            };
          }
        } else if (type === 'video' /* || type === "photo "*/) {
          const id = Math.random();
          return {
            ...obj,
            [id]: {
              id,
              type: type,
              position: 0,
              value: item.source,
            },
          };
        } else if (type === 'project_task') {
          const id = Math.random();

          return {
            ...obj,
            [id]: {
              id,
              type: 'openAnswer',
              position: 0,
              header: item.header,
              value: item.content[0], //приходит массив, но в нем всегда приходит одно значение, чтобы не было ошибки берем первое
              isTaskRequired: item.isDoneRequired,
            },
          };
        } else if (type === 'detailed_answer_task') {
          const id = Math.random();

          return {
            ...obj,
            [id]: {
              id,
              type: 'openAnswerTask',
              position: 0,
              header: item.header,
              value: item.content[0], //приходит массив, но в нем всегда приходит одно значение, чтобы не было ошибки берем первое
              isTaskRequired: item.isDoneRequired,
            },
          };
        } else if (type === 'separator') {
          const id = Math.random();

          return {
            ...obj,
            [id]: {
              id: id,
              type: 'separator',
              value: item.text,
            },
          };
        } else if (type === 'test_task') {
          const id = Math.random();

          return {
            ...obj,
            [id]: {
              id,
              type: 'singleChoice',
              header: item.header,
              content: item.content[0],
              options: item.options,
            },
          };
        } else {
          return {
            ...obj,
            item,
          };
        }
      }, {});

      setDataChange(dataContentObj);
    }
  }, [dataContent, formatRes, setDataChange]);

  useEffect(() => {
    if (newBlockId) {
      const id = Math.random();
      const position = lengthDataChange + 1;

      if (newBlockId === 'openAnswer') {
        setDataChange(state => ({
          ...state,
          [id]: {
            id,
            position,
            type: newBlockId,
            header: '',
            value: '',
            isTaskRequired: true,
          },
        }));
      } else {
        setDataChange(state => ({
          ...state,
          [id]: { id, position, type: newBlockId, value: '' },
        }));
      }

      setNewBlockId('');
      toggleOpenPanelNewBlock(false);
    }
  }, [
    newBlockId,
    dataChange,
    toggleOpenPanelNewBlock,
    lengthDataChange,
    setDataChange,
  ]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const isLessonHasOpenAnswear = arrayDataChange.some(
    element => element.type === 'openAnswer' && element.isTaskRequired
  );

  return (
    <div className={styles.content}>
      <div className={styles.desc}>
        Модуль {module?.position}, урок {lesson?.position}
      </div>
      <input
        className={styles.inputTitle}
        placeholder='Название урока'
        value={title}
        onChange={handleChangeTitle}
      />

      {isLessonHasOpenAnswear && (
        <RadioButtons aheadValue={aheadValue} setAheadValue={setAheadValue} />
      )}

      <div ref={ref}>
        {lengthDataChange
          ? arrayDataChange.map(
              ({
                id,
                position,
                type,
                value,
                header,
                isTaskRequired,
                content,
                options,
              }) => {
                return (
                  <PanelContent
                    key={id}
                    id={id}
                    position={position}
                    type={type}
                    value={value}
                    header={header ?? ''}
                    courseTag={courseTags}
                    isTaskRequired={isTaskRequired ?? false}
                    dataArray={arrayDataChange}
                    draggedItemId={draggedItemId}
                    content={content}
                    options={options}
                    setData={setDataChange}
                    setDraggedItemId={setDraggedItemId}
                  />
                );
              }
            )
          : null}
      </div>

      <PanelNewBlock
        refContent={ref}
        isOpen={isOpenPanelNewBlock}
        toggleOpen={toggleOpenPanelNewBlock}
        setNewBlockId={setNewBlockId}
      />
    </div>
  );
};
