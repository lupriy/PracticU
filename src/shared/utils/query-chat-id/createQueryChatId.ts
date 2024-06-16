import { SPACE_SING } from './constants';

type Params = { courseId: number; studentId: number; chatId: number };

export const createQueryChatId = ({ courseId, studentId, chatId }: Params) => ({
  id: `${courseId}${SPACE_SING}${studentId}${SPACE_SING}${chatId}`,
});
