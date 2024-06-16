import { useRef } from 'react';

export function useFocus() {
  const ref = useRef<HTMLElement>(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return [ref, setFocus];
}
