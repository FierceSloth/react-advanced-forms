import classNames from 'classnames';
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import styles from './input.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, className, id, ...rest }, ref): ReactNode => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={classNames(styles.wrapper, className)}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>

        <input className={classNames(styles.input, error && styles.inputError)} id={inputId} ref={ref} {...rest} />

        <div className={styles.errorContainer}>{error && <span className={styles.errorMessage}>{error}</span>}</div>
      </div>
    );
  }
);

Input.displayName = 'Input';
