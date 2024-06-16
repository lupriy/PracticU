import {
  ACCEPTED_STATUS,
  IN_PROGRESS_STATUS,
  REJECTED_STATUS,
} from './constants';

export type Status =
  | typeof ACCEPTED_STATUS
  | typeof IN_PROGRESS_STATUS
  | typeof REJECTED_STATUS;

export type TaskStatusProps = { status: Status };
