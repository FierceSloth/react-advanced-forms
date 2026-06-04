import { useEffect, type RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, onClose: () => void, isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent): void => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    globalThis.addEventListener('click', handleClick);

    return (): void => {
      globalThis.removeEventListener('click', handleClick);
    };
  }, [ref, onClose, isOpen]);
}
