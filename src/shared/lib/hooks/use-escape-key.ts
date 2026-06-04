import { useEffect } from 'react';

export function useEscapeKey(onClose: () => void, isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    globalThis.addEventListener('keydown', handleKeyDown);

    return (): void => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
