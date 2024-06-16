import { TDataChange } from 'pages/LessonsChange/LessonsChangeContent/types';
import { DeleteButton, TaskTextInput } from '../components';
import styles from '../TaskBlock.module.scss';
import { useEffect, useState } from 'react';
import { RadioGroup, useTheme } from '@mui/material';
import { RadioButton } from '../components/SingleChoise/RadioButton';
import { TestTaskOption } from '../../../../../../api/lesson-content/lessonContentType';

type TProps = {
  id: number;
  header: string;
  setData: React.Dispatch<React.SetStateAction<TDataChange>>;
  content: string;
  options: TestTaskOption[];
};

const INITIAL_TASK_OPTIONS = [{ text: '' }, { text: '' }, { text: '' }];

export const SingleChoice = ({
  id,
  header,
  setData,
  content,
  options,
}: TProps) => {
  const [title, setTitle] = useState(header);
  const [description, setDescription] = useState(content);
  const [taskOptions, setTaskOptions] = useState<TestTaskOption[]>(
    options || INITIAL_TASK_OPTIONS
  );
  const correctVariantIndex = options?.findIndex(item => item?.isCorrect);
  const [correctVariant, setCorrectVariant] = useState(correctVariantIndex);

  const theme = useTheme();
  useEffect(() => {
    setData(state => ({
      ...state,
      [id]: {
        ...state[id],
        header: title,
        content: description,
        options: taskOptions,
      },
    }));
  }, [id, description, setData, title, taskOptions]);

  const handleChangeTitle: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const handleChangeDescription: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    const { value } = e.currentTarget;
    setDescription(value);
  };

  const handleChangeCorrectVariant = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;

    setCorrectVariant(+value);
    setTaskOptions(state =>
      state.map((item, index) => ({ ...item, isCorrect: index === +value }))
    );
  };

  return (
    <div className={styles.block}>
      <DeleteButton id={id} setData={setData} />
      <TaskTextInput
        value={title}
        handleChangeValue={handleChangeTitle}
        placeholder='Название задания'
        className={styles.title}
      />
      <TaskTextInput
        value={description}
        handleChangeValue={handleChangeDescription}
        placeholder='Текст задания'
      />

      <div className={styles.singleChoise}>
        <RadioGroup
          value={correctVariant}
          onChange={handleChangeCorrectVariant}
        >
          {taskOptions.map((option, index) => (
            <RadioButton
              key={index}
              option={option}
              theme={theme}
              index={index}
              setTaskOptions={setTaskOptions}
              taskOptions={taskOptions}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
