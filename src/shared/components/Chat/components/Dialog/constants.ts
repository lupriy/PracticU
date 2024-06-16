import { OptionsStatus } from './types';

export const PANEL_CONTENT = {
  Today: 'Сегодня',
  Yesterday: 'Вчера',
};

export const OPTIONS_MONTH: Record<number, string> = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
};

export const DEFAULT_ITEM = {
  date: '0-0-0T00:00:00.478256Z',
};

export const STATUS_TASK_APPROVED = 'APPROVED';
export const STATUS_TASK_REJACTED = 'REJACTED';
export const STATUS_TASK_AWAITED = 'AWAITED';

//для получения нормального статуса (ключ приходит с бэка, значение нормальный статус)
export const OPTIONS_STATUS: OptionsStatus = {
  true: STATUS_TASK_APPROVED,
  false: STATUS_TASK_REJACTED,
  null: STATUS_TASK_AWAITED,
};

export const LIMIT = 30;
