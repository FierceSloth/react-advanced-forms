import classNames from 'classnames';
import type { ReactNode } from 'react';

import styles from './glass-card.module.scss';

interface IProps {
  className: string;
  children: ReactNode;
}

export function GlassCard({ className, children }: IProps): ReactNode {
  return <div className={classNames(styles.glassCard, className)}>{children}</div>;
}
