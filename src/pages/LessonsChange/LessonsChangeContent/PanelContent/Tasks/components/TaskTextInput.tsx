import { useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import s from './TaskTextInput.module.scss';

const MIN_DESCRIPTION_HEIGHT = 28;
type TProps = {
  value: string;
  handleChangeValue: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  className?: string;
};

export const TaskTextInput = ({
  value,
  handleChangeValue,
  placeholder,
  className,
}: TProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const scrollHeight = ref.current?.scrollHeight ?? 0;
    const height = `${Math.max(scrollHeight, MIN_DESCRIPTION_HEIGHT)}px`;

    if (ref?.current?.style) {
      ref.current.style.height = 'inherit';
      ref.current.style.height = height;
    }
  }, [value]);

  return (
    <textarea
      className={cn(s.description, className)}
      placeholder={placeholder || 'Вариант 1'}
      rows={1}
      ref={ref}
      value={value || ''}
      onChange={handleChangeValue}
    />
  );
};
