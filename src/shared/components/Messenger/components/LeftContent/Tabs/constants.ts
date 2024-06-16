import {
  ID_TYPE_MESSENGER_NOT_VERIFIED,
  ID_TYPE_MESSENGER_ALL,
} from '../constants';
import { Tabs } from './types';

export const TABS: Tabs = [
  { id: ID_TYPE_MESSENGER_NOT_VERIFIED, lable: 'Требуют проверки' },
  { id: ID_TYPE_MESSENGER_ALL, lable: 'Все' },
];
