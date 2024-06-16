import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
  OPEN_CONTENT_FOR_ONE_MODULE,
  OPEN_CONTENT_FOR_TWO_MODULES,
} from 'pages/LessonsChange/constans';

type TProps = {
  aheadValue: string | null;
  setAheadValue: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioButtons = ({ aheadValue, setAheadValue }: TProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAheadValue(event.target.value);
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <RadioGroup value={aheadValue} onChange={handleChange}>
        <FormControlLabel
          value={OPEN_CONTENT_FOR_ONE_MODULE}
          control={<Radio />}
          label='Пускать студента на +1 модуль после отправки ответа'
        />
        <FormControlLabel
          value={OPEN_CONTENT_FOR_TWO_MODULES}
          control={<Radio />}
          label='Пускать студента на +2 модуля после отправки ответа'
        />
      </RadioGroup>
    </div>
  );
};
