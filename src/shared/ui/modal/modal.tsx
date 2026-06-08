import classNames from 'classnames';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { GlassCard } from '@/shared/ui/glass-card';

import styles from './modal.module.scss';

interface IProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ className, isOpen, onClose, children }: IProps): ReactNode {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogReference.current;
    if (!dialogElement) return;

    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && dialogElement.open) {
      dialogElement.close();
      document.body.style.overflow = '';
    }

    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const dialogElement = dialogReference.current;
    if (!dialogElement) return;

    const handleNativeClose = (): void => {
      onClose();
    };

    dialogElement.addEventListener('close', handleNativeClose);

    return (): void => {
      dialogElement.removeEventListener('close', handleNativeClose);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <dialog ref={dialogReference} className={styles.dialog} onClick={handleBackdropClick}>
      <GlassCard className={classNames(styles.card, className)}>{children}</GlassCard>
    </dialog>,
    document.body
  );
}
