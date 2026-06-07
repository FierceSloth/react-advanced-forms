import { useEffect, useRef, type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  onClose: () => void,
  isOpen: boolean
): RefObject<T | null> {
  const ref = useRef<T>(null);

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
  }, [onClose, isOpen]);

  return ref;
}
