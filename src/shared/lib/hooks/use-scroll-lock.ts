import { useEffect } from 'react';

export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    document.body.style.overflow = 'hidden';

    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}
