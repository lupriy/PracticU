import React, { useState, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import cn from 'classnames';

import { MatchingTask } from './MatchingTask';
import { TestTask } from './TestTask';
import { DetailedAnswerTask } from './DetailedAnswerTask';
import { Video } from './Video';
import { MARKDOWN_OVERRIDED_COMPONENTS } from './MarkdownComponents';
import { Content as ContentType } from '../../../api/lesson-content/lessonContentType';
import { Button } from '../../../shared/components/Button';
import { api } from 'api/index';
import styles from './styles.module.scss';
import { STATUS_COMPLETED } from './constants';

type TProps = {
  content: ContentType;
  matchesTablet: Boolean;
  lessonId: number;
  bookmark: string;
  setBookmark: React.Dispatch<React.SetStateAction<string>>;
  setIsLastBookmarkClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
};

export const CurrentLessonContent = ({
  content,
  matchesTablet,
  bookmark,
  lessonId,
  setBookmark,
  setIsLastBookmarkClicked,
  setRefetch,
}: TProps) => {
  const {
    lesson: { lessonBookmarkCreate },
  } = api;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonIndex, setButtonIndex] = useState(0);

  //TODO: разделить на 2 ref
  const currentSeparatorButtonRef = useRef<HTMLElement | HTMLButtonElement>(
    null
  );
  const theme = useTheme();

  const separatorsIndexes = useMemo(
    () =>
      content.reduce((arr: number[], item, index) => {
        const { type } = item;
        const isSeparator = type === 'separator';
        const isLastIndex = index === content.length - 1;

        if (isSeparator || isLastIndex) {
          return [...arr, index];
        }

        return arr;
      }, []),
    [content]
  );

  const separatorsIndexesLength = separatorsIndexes.length;

  const handleSeparatorClick = async (index: number, separatorId: string) => {
    const distanceToElement =
      //TODO: проверить типы (возможно это нерабочий код)
      //@ts-ignore
      currentSeparatorButtonRef.current?.offsetTop -
      document.documentElement.scrollTop;

    setTimeout(() => {
      scrollToNextContent(distanceToElement);
    }, 300);

    if (currentIndex < separatorsIndexesLength - 1) {
      setCurrentIndex(prevState => prevState + 1);
      //TODO: проверить типы (возможно это нерабочий код)
      //@ts-ignore
      if ('disabled' in currentSeparatorButtonRef.current) {
        currentSeparatorButtonRef.current.disabled = true;
      }

      if (currentIndex === separatorsIndexesLength - 2) {
        setBookmark(STATUS_COMPLETED);
        await lessonBookmarkCreate(lessonId, { bookmark: STATUS_COMPLETED });
        setIsLastBookmarkClicked(true);
      }
    }
    setButtonIndex(index);
  };

  const endIndexForSlice =
    bookmark === STATUS_COMPLETED || !separatorsIndexesLength
      ? content.length
      : separatorsIndexes[currentIndex];

  const partialContent = content?.slice(0, endIndexForSlice + 1);

  const scrollToNextContent = (scrollDistance: number) => {
    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {partialContent.map((component, index) => {
        const { type } = component;

        if (type === 'text') {
          return (
            <Markdown
              options={{
                wrapper: 'section',
                forceBlock: true,
                overrides: MARKDOWN_OVERRIDED_COMPONENTS,
              }}
              key={index}
              className={cn(styles['text-block'], {
                [styles['with-border']]: component.isImportant,
                [styles['important']]: component.isImportant,
                [styles['important-mobile']]:
                  component.isImportant && !matchesTablet,
                [styles[theme.name]]: component.isImportant,
              })}
              ref={currentSeparatorButtonRef}
            >
              {component.text}
            </Markdown>
          );
        } else if (type === 'video') {
          return <Video component={component} key={index} />;
        } else if (type === 'test_task') {
          return (
            <TestTask
              component={component}
              key={index}
              className={cn({
                [styles['with-border-mobile']]: !matchesTablet,
              })}
            />
          );
        } else if (type === 'matching_task') {
          return (
            <MatchingTask
              component={component}
              key={index}
              className={cn({
                [styles['with-border-mobile']]: !matchesTablet,
              })}
            />
          );
        } else if (type === 'detailed_answer_task') {
          return (
            <DetailedAnswerTask
              component={component}
              key={index}
              className={cn({
                [styles['with-border-mobile']]: !matchesTablet,
              })}
              setRefetch={setRefetch}
            />
          );
        } else if (type === 'project_task') {
          return (
            <DetailedAnswerTask
              component={component}
              key={index}
              withFileUpload
              className={cn({
                [styles['with-border-mobile']]: !matchesTablet,
              })}
              setRefetch={setRefetch}
            />
          );
        } else if (type === 'separator') {
          const isDisabled =
            bookmark === STATUS_COMPLETED ||
            (index !== 0 && index <= buttonIndex);

          return (
            <div key={index}>
              <Button
                //@ts-ignore
                ref={currentSeparatorButtonRef}
                key={index}
                children={component.text}
                withTheme
                onClick={() => handleSeparatorClick(index, component.id)}
                className={styles.separator}
                disabled={isDisabled}
              />
            </div>
          );
        }

        return <></>;
      })}
    </>
  );
};
