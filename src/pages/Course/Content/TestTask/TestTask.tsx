import React, { useEffect, useState } from 'react';
import { FormControlLabel, RadioGroup } from '@mui/material';
import cn from 'classnames';

import { api } from '../../../../api';
import { TestTaskOption } from '../../../../api/lesson-content/lessonContentType';
import { Button } from '../../../../shared/components/Button';
import { StyledRadio } from '../../../../shared/components/mui-styled/Radio';
import { ListEdge } from '../../../../shared/components/ListEdge';
import { CONFIRM_BUTTON_TEXT } from '../constants';
import { TestTaskProps } from './types';
import contentStyles from '../styles.module.scss';
import styles from './styles.module.scss';

const { taskResultList, taskResultCreate } = api.taskResult;

export const TestTask = ({
  component: { id, header, options },
  className,
}: TestTaskProps) => {
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [optionsComments, setOptionsComments] = useState<TestTaskOption[]>([]);
  const [isEachInputDisabled, setIsEachInputDisabled] = useState(true);

  useEffect(() => {
    let cleanupFunction = false;
    const asyncEffect = async () => {
      try {
        const response = await taskResultList({
          task: String(id),
          ordering: '-created_at',
          with_content: true,
          limit: 1,
        });
        const { results } = response.data;
        const content = results?.[0]?.content;

        if (!cleanupFunction) {
          if (content) {
            const parsedContent = JSON.parse(content);

            setChosenOption(parsedContent.chosenOptionIndexes?.[0]);
            setOptionsComments(parsedContent.options);
            setIsEachInputDisabled(true);
          } else {
            setIsEachInputDisabled(false);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();

    return () => {
      cleanupFunction = true;
    };
  }, [id]);

  const handleOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberValue = +value;

    setChosenOption(numberValue);
  };

  const handleButtonClick = async () => {
    try {
      if (chosenOption !== null && id) {
        const correctResponse = await taskResultCreate({
          task: id,
          content: JSON.stringify({
            chosenOptionIndexes: [chosenOption],
          }),
        });

        const optionsCommentsFromResponse: TestTaskOption[] = JSON.parse(
          correctResponse.data.content
        ).options;

        setOptionsComments(optionsCommentsFromResponse);
        setIsEachInputDisabled(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className={cn(contentStyles['with-border'], className)}>
      <h2>{header}</h2>
      <RadioGroup onChange={handleOptionClick}>
        {options.map((option, optionIndex) => {
          return (
            <React.Fragment key={optionIndex}>
              <FormControlLabel
                disabled={isEachInputDisabled}
                value={optionIndex}
                checked={optionIndex === chosenOption}
                control={<StyledRadio className={styles.radio} />}
                label={
                  <>
                    {optionsComments[optionIndex]?.isCorrect !== undefined && (
                      <ListEdge
                        className={cn(styles['list-edge'], {
                          [styles['list-edge-correct']]:
                            optionsComments[optionIndex]?.isCorrect,
                          [styles['list-edge-wrong']]:
                            optionsComments[optionIndex]?.isCorrect === false,
                        })}
                      />
                    )}
                    <p>{option.text}</p>
                    {!!optionsComments.length && (
                      <p
                        className={cn(styles.answer, {
                          [styles.correct]:
                            optionsComments[optionIndex]?.isCorrect,
                          [styles.wrong]:
                            !optionsComments[optionIndex]?.isCorrect,
                        })}
                      >
                        {optionsComments?.[optionIndex]?.comment}
                      </p>
                    )}
                  </>
                }
                className={cn(styles['form-control-label'])}
              />
            </React.Fragment>
          );
        })}
      </RadioGroup>

      <Button
        withTheme
        className={contentStyles['task-buttons']}
        disabled={isEachInputDisabled}
        onClick={handleButtonClick}
      >
        {CONFIRM_BUTTON_TEXT}
      </Button>
    </section>
  );
};
