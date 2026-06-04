import classNames from 'classnames';
import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { GlassCard } from '@/shared/ui/glass-card';

import { useClickOutside } from '@/shared/lib/hooks/use-click-outside';
import { useEscapeKey } from '@/shared/lib/hooks/use-escape-key';
import { useScrollLock } from '@/shared/lib/hooks/use-scroll-lock';

import styles from './modal.module.scss';

interface IProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ className, isOpen, onClose, children }: IProps): ReactNode {
  const cardReference = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose, isOpen);
  useClickOutside(cardReference, onClose, isOpen);
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div ref={cardReference} className={styles.contentWrapper}>
        <GlassCard className={classNames(styles.card, className)}>
          <div className={styles.modalBody}>{children}</div>
        </GlassCard>
      </div>
    </div>,
    document.body
  );
}
