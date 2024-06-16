import {
  DetailedAnswerTask,
  ProjectTask,
} from '../../../../api/lesson-content/lessonContentType';

export type TestTaskProps = {
  component: DetailedAnswerTask | ProjectTask;
  withFileUpload?: boolean;
  className?: string;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
};
