import {
  STATUS_TASK_APPROVED,
  STATUS_TASK_REJACTED,
  STATUS_TASK_AWAITED,
} from './constants';

export type TaskStatus =
  | typeof STATUS_TASK_APPROVED
  | typeof STATUS_TASK_REJACTED
  | typeof STATUS_TASK_AWAITED;

export type OptionsStatus = Record<string, TaskStatus>;

export type Message = {
  id: number;
  date: string;
  text: string;
  idSender: number;
  task: {
    id: number;
    status: TaskStatus;
  } | null;
  attachments: {
    id: number;
    filename: string;
    content_type: string;
  }[];
};

export type Dialog = Message[];
