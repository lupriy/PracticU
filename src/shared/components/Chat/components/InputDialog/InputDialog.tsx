import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import cn from 'classnames';

//когда будет реализовываться чат студента это заюзается
/* import { useAppSelector } from '../../../../../redux/hooks';
  import { userGroupSelector } from '../../../../../redux/user/selectors';
  import { ID_ROLE_MENTOR } from '../../../../../shared/constants/constants'; */
import { api } from '../../../../../api';
import { SendIcon } from './SendIcon';
import {
  HEIGHT_TEXTAREA,
  MIN_COUNT_ROWS,
  MAX_COUNT_ROWS,
  ENTER_CODE,
} from './constants';
import { SelectorFiles, BlockFilesSelect } from './components';
import s from './styles.module.scss';

const { messageCreate, messageAttachmentCreateAllCreate } = api.message;

type Props = {
  courseId: number;
  studentId: number;
  idRecipient: number;
  classNameInputDialog?: string;
  setCountUpdate: React.Dispatch<React.SetStateAction<number>>;
};

export const InputDialog = forwardRef(
  (
    {
      courseId,
      studentId,
      idRecipient,
      classNameInputDialog,
      setCountUpdate,
    }: Props,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const refTextarea: React.LegacyRef<HTMLTextAreaElement> = useRef(null);
    const [text, setText] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabledSend, setIsDisabledSend] = useState(false);
    const [isPressEnter, setIsPressEnter] = useState(false);
    const [filesSelect, setFilesSelect] = useState<File[]>([]);

    useEffect(() => {
      setCountUpdate(state => ++state);
    }, [filesSelect, setCountUpdate]);

    useEffect(() => {
      setCountUpdate(state => ++state);

      return () => setCountUpdate(0);
    }, [setCountUpdate]);

    useEffect(() => {
      const textLength = text.length;
      const isDisabledSend = !textLength;
      setIsDisabledSend(isDisabledSend);
    }, [text]);

    const resetValues = useCallback(() => {
      const style = refTextarea.current?.style;

      setText('');
      setFilesSelect([]);
      setIsDisabled(false);
      setIsDisabledSend(false);
      setIsPressEnter(false);
      refTextarea.current?.focus();
      if (style) {
        style.height = `${HEIGHT_TEXTAREA}px`;
      }
      setCountUpdate(state => ++state);
    }, [setCountUpdate]);

    const handleSend = useCallback(async () => {
      try {
        setIsDisabled(true);
        const res = await messageCreate({
          course: +courseId,
          student: +studentId,
          recipient: idRecipient,
          text: text,
        });
        const {
          data: { id },
        } = res;
        await messageAttachmentCreateAllCreate(`${id}`, filesSelect);
        resetValues();
      } catch (e) {
        console.error(e);
        resetValues();
      }
    }, [text, courseId, studentId, idRecipient, filesSelect, resetValues]);

    const handleKeyDown: React.KeyboardEventHandler<
      HTMLTextAreaElement
    > = e => {
      const { shiftKey, key } = e;

      if (!shiftKey && key === ENTER_CODE && !isDisabledSend) {
        handleSend();
      } else if (key === ENTER_CODE && isDisabledSend) {
        setIsPressEnter(true);
      }
    };

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
      useCallback(
        e => {
          if (!isPressEnter) {
            const { value } = e.currentTarget;
            setText(value);
            setCountUpdate(state => ++state);

            const scrollHeight = refTextarea.current?.scrollHeight;
            const style = refTextarea.current?.style;
            const arrRows = value?.split('\n');
            const countRows = arrRows.length;

            if (countRows <= MIN_COUNT_ROWS && style) {
              style.height = `${HEIGHT_TEXTAREA}px`;
            } else if (
              scrollHeight &&
              scrollHeight > HEIGHT_TEXTAREA &&
              countRows <= MAX_COUNT_ROWS
            ) {
              refTextarea.current.style.height = 'auto';
              refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`;
            }
          } else {
            setIsPressEnter(false);
          }
        },
        [isPressEnter, setCountUpdate]
      );

    const isDisabledButton = isDisabled || isDisabledSend;

    return (
      <div ref={ref}>
        {filesSelect.length ? (
          <BlockFilesSelect
            filesSelect={filesSelect}
            setFilesSelect={setFilesSelect}
          />
        ) : null}
        <div className={cn(s.block, classNameInputDialog)}>
          <SelectorFiles setFilesSelect={setFilesSelect} />
          <textarea
            className={s.input}
            placeholder='Напишите сообщение...'
            ref={refTextarea}
            value={text}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <button
            className={s.buttonSend}
            disabled={isDisabledButton}
            onClick={handleSend}
          >
            <SendIcon isDisabled={isDisabledButton} />
          </button>
        </div>
      </div>
    );
  }
);
