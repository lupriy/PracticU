import { TaskResultContent } from '../../../../api';

export type TaskResultModalProps = {
  id: number;
  matchesDesktop: boolean;
  withButtons?: boolean;
  /*   content: TaskResultContent["content"]; */
  attachments: TaskResultContent['attachments'];
  currentTaskResultId: number;
  onAccept?: () => void;
  onReject?: () => void;
};
