import { useCallback } from 'react';

import { useFormatSlateInMarkdown } from './';
import { TDataChange } from '../LessonsChangeContent/types';

const getFakeSlateObject = (text: string, type: string) => ({
  type,
  children: [
    {
      text,
    },
  ],
});

type TParams = {
  data: TDataChange;
};

export const useFormatDataForSave = () => {
  const { formatRes: formatResSlate } = useFormatSlateInMarkdown();

  const formatDataSave = useCallback(
    ({ data }: TParams) => {
      const dataArr = Object.values(data);

      const dataFormat = dataArr?.map(item => {
        const {
          type,
          value,
          header,
          isTaskRequired,
          language,
          photoLabel,
          text,
          options,
          content,
        } = item;

        let valueFormat: any = value;

        if (Array.isArray(value)) {
          valueFormat = value.map(item => ({ ...item, type }));
        }

        if (
          type === 'paragaph' ||
          type === 'unnumberedList' ||
          type === 'numberedList' ||
          type === 'h1' ||
          type === 'h2' ||
          type === 'h3'
        ) {
          //@ts-ignore
          const newValue = valueFormat?.map(item => {
            const { type, children } = item;

            //@ts-ignore
            const newChildren = children.map(item => {
              const { type } = item;

              if (type === 'link') {
                return { ...item, link: item.href };
              }
              return item;
            });

            return { type, children: newChildren };
          });

          return {
            type: 'text',
            text: formatResSlate(newValue, type) /* .replace(/[\n\r]+/g, "") */,
            isImportant: false,
          };
        } else if (type === 'video') {
          return {
            type: 'video',
            source: value,
          };
        } else if (type === 'photo') {
          //временное решение
          return {
            type: 'text',
            text: `![${photoLabel}](${value})` /* .replace(/[\n\r]+/g, "") */,
            isImportant: false,
          };
        } else if (type === 'openAnswer') {
          return {
            type: 'project_task',
            id: null,
            header: item?.header,
            content: [value] /* временное решение */,
            isDoneRequired: isTaskRequired,
            isAcceptRequired: isTaskRequired,
          };
        } else if (type === 'openAnswerTask') {
          return {
            type: 'detailed_answer_task',
            id: null,
            header: item?.header,
            content: [value],
            isDoneRequired: isTaskRequired,
            isAcceptRequired: isTaskRequired,
          };
        } else if (type === 'separator') {
          const id = Math.random();
          return {
            id: `${id}`,
            type: 'separator',
            text: text,
          };
        } else if (type === 'code') {
          return {
            type: 'text',
            text: `\`\`\`${language}\n${value}\`\`\` `,
            isImportant: false,
          };
        } else if (type === 'singleChoice') {
          return {
            type: 'test_task',
            id: null,
            header: item?.header,
            content: [content],
            isDoneRequired: true,
            isAcceptRequired: true,
            options: options,
            isSeveral: false,
          };
        } else if (type === 'importantThought') {
          const realHeader = header ?? '';
          const headerSplit = realHeader.split('\n');
          const valueSplit = value.split('\n');
          const headerFakeSlateObjects = headerSplit.map(item =>
            getFakeSlateObject(item, 'h3')
          );
          const valueFakeSlateObjects = valueSplit.map(item =>
            getFakeSlateObject(item, 'paragraph')
          );
          const headerMarkdown = formatResSlate(headerFakeSlateObjects, 'h3');
          const valueMarkdown = formatResSlate(
            valueFakeSlateObjects,
            'paragraph'
          );
          const text = headerMarkdown + valueMarkdown;

          return {
            type: 'text',
            text,
            isImportant: true,
          };
        }

        //тут будет возвращаться другие типы (задания)
        return null;
      });

      return dataFormat;
    },
    [formatResSlate]
  );

  return { formatDataSave };
};
