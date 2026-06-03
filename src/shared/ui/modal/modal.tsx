import { GlassCard } from '@/shared/ui/glass-card';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';
import styles from './modal.module.scss';

interface IProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ className, isOpen, onClose, children }: IProps): ReactNode {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    globalThis.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.body.style.overflow = '';
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <GlassCard className={classNames(styles.card, className)} onClick={(event) => event.stopPropagation()}>
        <div className={styles.modalBody}>{children}</div>
      </GlassCard>
    </div>,
    document.body
  );
}
