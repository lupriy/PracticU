import { Checked } from './Checked';
import s from './SuccessAlert.module.scss';

type PropsType = {
  text: string;
};

export const SuccessAlert = ({ text }: PropsType) => {
  return (
    <div className={s.root}>
      <Checked />
      <div>{text}</div>
    </div>
  );
};
