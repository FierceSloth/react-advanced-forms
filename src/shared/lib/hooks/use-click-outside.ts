import { useEffect, type RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, onClose: () => void, isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent): void => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    globalThis.addEventListener('mousedown', handlePointerDown);
    globalThis.addEventListener('touchstart', handlePointerDown);

    return (): void => {
      globalThis.removeEventListener('mousedown', handlePointerDown);
      globalThis.removeEventListener('touchstart', handlePointerDown);
    };
  }, [ref, onClose, isOpen]);
}
