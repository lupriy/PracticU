import { useEffect, useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';
import Markdown from 'markdown-to-jsx';
import cn from 'classnames';
import { api } from '../../../../api';
import { Button } from '../../../../shared/components/Button';
import { ListEdge } from '../../../../shared/components/ListEdge';
import { MEDIA_QUERY_DESKTOP } from '../../../../shared/theme/mediaQuery';
import { CONFIRM_BUTTON_TEXT } from '../constants';
import { CORRECT_ANSWER, EMPTY_OPTIONS, WRONG_ANSWER } from './constants';
import { MatchingTaskProps } from './types';
import { isStringsEqual } from './utils';
import contentStyles from '../styles.module.scss';
import styles from './styles.module.scss';

const { taskResultRetrieve, taskResultCreate } = api.taskResult;

export const MatchingTask = ({
  component: { id, options, header, content },
  className,
}: MatchingTaskProps) => {
  const [chosenOptions, setChosenOptions] = useState<string[]>(
    new Array(options.length).fill('')
  );
  const [correctOptions, setCorrectOptions] = useState<string[]>([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);

  const [messageToUser, setMessageToUser] = useState('');

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        if (id) {
          const response = await taskResultRetrieve(id);
          const {
            data: { accepted, content },
          } = response;

          if (accepted && content) {
            setIsInputDisabled(true);
            setChosenOptions(JSON.parse(content).chosenOptionIndexes);
            setCorrectOptions(JSON.parse(content).correctOptionIndexes);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [id]);

  const handleChange = (event: SelectChangeEvent, index: number) => {
    setMessageToUser('');
    const newOptionsState = [...chosenOptions];
    newOptionsState[index] = event.target.value;
    setChosenOptions(newOptionsState);
  };

  const handleButtonClick = async () => {
    try {
      if (chosenOptions.includes('')) {
        setMessageToUser(EMPTY_OPTIONS);
      } else if (id) {
        const response = await taskResultCreate({
          task: id,
          content: JSON.stringify({
            chosenOptionIndexes: chosenOptions,
          }),
        });
        const responseCorrectOptionIndexes = JSON.parse(
          response.data.content
        ).correctOptionIndexes;
        setIsInputDisabled(true);
        setCorrectOptions(responseCorrectOptionIndexes);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className={cn(contentStyles['with-border'], className)}>
      <h2 className={contentStyles['header-callout']}>{header}</h2>
      {content.length && <Markdown>{content[0]}</Markdown>}
      <ul>
        {options.map((item, optionIndex) => {
          const { text, variants } = item;
          const correctOptionsLength = correctOptions.length;
          const correctOptionsItem = correctOptions[optionIndex];
          const chosenOptionsItem = chosenOptions[optionIndex];

          return (
            <li
              key={optionIndex}
              className={cn(styles['matching-task-item'], {
                [styles['matching-task-item-tablet']]: !matchesDesktop,
              })}
            >
              {!!correctOptionsLength && matchesDesktop && (
                <ListEdge
                  className={
                    isStringsEqual(chosenOptionsItem, correctOptionsItem)
                      ? cn(styles['list-edge'], styles['list-edge-correct'])
                      : cn(styles['list-edge'], styles['list-edge-wrong'])
                  }
                />
              )}
              <p
                className={cn(styles.text, 'size-m', {
                  [styles['text-tablet']]: !matchesDesktop,
                })}
              >
                {text}
              </p>
              <FormControl>
                <Select
                  // Этим условием не даем переключить значения, если ответ уже пришел,
                  // но оставляем возможность просмотра
                  value={
                    correctOptionsLength
                      ? correctOptionsItem
                      : chosenOptionsItem
                  }
                  onChange={event => handleChange(event, optionIndex)}
                  className={cn(styles['select-menu-item'], {
                    [styles['select-menu-item-tablet']]: !matchesDesktop,
                    [styles.correct]:
                      !!correctOptionsLength &&
                      isStringsEqual(chosenOptionsItem, correctOptionsItem),
                    [styles.wrong]:
                      !!correctOptionsLength &&
                      !isStringsEqual(chosenOptionsItem, correctOptionsItem),
                  })}
                >
                  {variants.map((variant, index) => (
                    <MenuItem key={index} value={index}>
                      <p className='size-m'>{variant}</p>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
          );
        })}
      </ul>
      <p
        className={cn(styles.answer, 'size-m', {
          [styles.correct]: messageToUser === CORRECT_ANSWER,
          [styles.wrong]: messageToUser === WRONG_ANSWER || EMPTY_OPTIONS,
        })}
      >
        {messageToUser}
      </p>
      <Button
        withTheme
        className={contentStyles['task-buttons']}
        onClick={handleButtonClick}
        disabled={isInputDisabled}
      >
        {CONFIRM_BUTTON_TEXT}
      </Button>
    </section>
  );
};
