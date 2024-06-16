import { FormControlLabel, Theme } from '@mui/material';
import { StyledRadio } from '../../../../../../../shared/components/mui-styled/Radio';
import { TaskTextInput } from '../TaskTextInput';
import { useState, useEffect } from 'react';
import { TestTaskOption } from 'api/lesson-content/lessonContentType';
import s from './RadioButton.module.scss';

type TProps = {
  theme?: Theme;
  index: number;
  option: TestTaskOption;
  setTaskOptions: React.Dispatch<React.SetStateAction<TestTaskOption[]>>;
  taskOptions: TestTaskOption[];
};

export const RadioButton = ({
  option,
  theme,
  index,
  setTaskOptions,
  taskOptions,
}: TProps) => {
  const [value, setValue] = useState(option.text);
  const [comment, setComment] = useState(option.comment);
  const position = index + 1;

  useEffect(() => {
    const newState = [...taskOptions];
    newState[index] = { ...newState[index], text: value, comment: comment };

    if (position === newState.length && value && newState.length !== 10) {
      newState.push({ text: '' });
    }

    setTaskOptions(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, comment]);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControlLabel
        value={index}
        control={<StyledRadio theme={theme} />}
        sx={{ width: 600, gap: '10px' }}
        label={
          <TaskTextInput
            value={value}
            handleChangeValue={handleChangeDescription}
            placeholder={`Вариант ${position}`}
            className={s.radioText}
          />
        }
      />
      {value && (
        <div className={s.comment}>
          <span>{'//'}</span>
          <TaskTextInput
            value={comment ?? ''}
            handleChangeValue={e => setComment(e.target.value)}
            placeholder='Комментарий (будет виден после выбора варианта)'
            className={s.commentText}
          />
        </div>
      )}
    </>
  );
};
