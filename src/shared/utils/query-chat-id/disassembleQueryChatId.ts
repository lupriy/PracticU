import { SPACE_SING, DEFAULT_RESULT } from './constants';

type Props = { chatId: string | null };

export const disassembleQueryChatId = ({ chatId: chatIdParam }: Props) => {
  const [courseId, studentId, chatId] =
    chatIdParam?.split(SPACE_SING) || DEFAULT_RESULT;

  return { courseId: +courseId, studentId: +studentId, chatId: +chatId };
};
