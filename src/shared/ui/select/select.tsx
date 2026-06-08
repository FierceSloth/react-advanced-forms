import classNames from 'classnames';
import { useId, type ReactNode, type Ref, type SelectHTMLAttributes } from 'react';

import styles from './select.module.scss';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  label: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({ label, error, className, id, children, ref, ...rest }: IProps): ReactNode {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>

      <select id={selectId} ref={ref} className={classNames(styles.select, error && styles.selectError)} {...rest}>
        {children}
      </select>

      <div className={styles.errorContainer}>{error && <span className={styles.errorMessage}>{error}</span>}</div>
    </div>
  );
}
