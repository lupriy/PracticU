import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import { useMediaQuery } from '@mui/material';

import { api } from '../../../../api';
import { Button, ModalDialog } from '../../../../shared/components';
import { StyledTextField } from '../../../../shared/components/mui-styled/TextField';
import { MEDIA_QUERY_TABLET } from '../../../../shared/theme/mediaQuery';
import { useAppSelector } from '../../../../redux/hooks';
import { courseSelector } from '../../../../redux/course/selectors';
import { ReactComponent as DialogIcon } from '../../../../shared/icons/dialog.svg';
import { MARKDOWN_OVERRIDED_COMPONENTS } from '../MarkdownComponents';
import { FileUpload } from './FileUpload';
import {
  TaskStatus,
  Status,
  ACCEPTED_STATUS,
  IN_PROGRESS_STATUS,
  REJECTED_STATUS,
} from './TaskStatus';
import { TestTaskProps } from './types';
import contentStyles from '../styles.module.scss';
import styles from './styles.module.scss';

const { taskResultList } = api.taskResult;

export const DetailedAnswerTask = ({
  component: { id, header, content },
  withFileUpload,
  className,
  setRefetch,
}: TestTaskProps) => {
  const [textFieldContent, setTextFieldContent] = useState('');
  const [messageToUser, setMessageToUser] = useState('');
  const [isEachInputDisabled, setIsEachInputDisabled] = useState(true);
  const [taskResultStatus, setTaskResultStatus] = useState<Status | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const activeCourse = useAppSelector(courseSelector);

  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const response = await taskResultList({
          task: String(id),
          ordering: '-created_at',
          limit: 1,
          with_content: true,
        });
        const { results } = response.data;

        const responseResultsFirst = results?.[0];
        const responseContent = responseResultsFirst?.content;
        const responseTaskStatus = responseResultsFirst?.accepted;

        if (responseTaskStatus) {
          setTaskResultStatus(ACCEPTED_STATUS);
        } else if (responseTaskStatus === false) {
          setTaskResultStatus(REJECTED_STATUS);
        } else if (responseTaskStatus === null) {
          setTaskResultStatus(IN_PROGRESS_STATUS);
        }

        if (!responseResultsFirst || responseTaskStatus === false) {
          setIsEachInputDisabled(false);
        }

        if (responseContent) {
          const lastAnswer = JSON.parse(responseContent).text;
          setTextFieldContent(lastAnswer);
        }
      } catch (e) {
        console.error(e);
      }
    };

    asyncEffect();
  }, [id]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTextFieldContent(value);
    },
    []
  );

  const handleButtonClick = async () => {
    try {
      if (textFieldContent && id) {
        const response = await api.taskResult.taskResultCreate({
          task: id,
          content: JSON.stringify({
            text: textFieldContent,
          }),
        });

        const {
          data: { accepted },
        } = response;

        setIsEachInputDisabled(true);

        accepted
          ? setTaskResultStatus(ACCEPTED_STATUS)
          : setTaskResultStatus(IN_PROGRESS_STATUS);

        setRefetch(state => ++state);

        return response.data.id;
      } else {
        setMessageToUser('Поле не заполнено');
        throw new Error('Textfield content is empty');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenModal = useCallback(() => setIsVisibleModal(true), []);

  const isLengthContent = content.length;
  const mentorId = activeCourse?.mentor?.id ?? 0;
  const courseId = activeCourse?.id ?? 0;
  const courseName = activeCourse?.name ?? '';

  return (
    <>
      <section
        className={cn(
          styles['detailed-task'],
          contentStyles['with-border'],
          className
        )}
      >
        {header && <h2 className={styles['header-callout']}>{header}</h2>}
        {isLengthContent && (
          <Markdown
            options={{
              wrapper: 'section',
              forceBlock: true,
              overrides: MARKDOWN_OVERRIDED_COMPONENTS,
            }}
          >
            {content[0]}
          </Markdown>
        )}
        <h4 className={styles.subheader}>Ваш ответ</h4>
        <StyledTextField
          value={textFieldContent}
          onChange={handleChange}
          className={styles['test-input']}
          minRows={!matchesTablet ? 9 : 4}
          multiline
          disabled={isEachInputDisabled}
        />
        <p className={styles.answer}>{messageToUser}</p>
        <div
          className={cn({
            [styles['with-bottom-margin']]: taskResultStatus,
            [styles['with-bottom-margin-mobile']]: !matchesTablet,
          })}
        >
          {withFileUpload && id && !isEachInputDisabled ? (
            <FileUpload
              labelId={id}
              onClick={handleButtonClick}
              handleChatClick={handleOpenModal}
            />
          ) : (
            <div className={contentStyles['task-buttons']}>
              <Button
                withTheme
                onClick={handleButtonClick}
                disabled={isEachInputDisabled}
              >
                Отправить
              </Button>
              <button
                onClick={handleOpenModal}
                className={cn(styles.button, 'size-m')}
              >
                <DialogIcon />
                Задать вопрос
              </button>
            </div>
          )}
        </div>
        {taskResultStatus && <TaskStatus status={taskResultStatus} />}
      </section>
      {isVisibleModal && (
        <ModalDialog
          mentorId={mentorId}
          courseId={courseId}
          courseName={courseName}
          setIsVisible={setIsVisibleModal}
        />
      )}
    </>
  );
};
