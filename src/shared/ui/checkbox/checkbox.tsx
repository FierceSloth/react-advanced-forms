import classNames from 'classnames';
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import styles from './checkbox.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, className, id, ...rest }, ref): ReactNode => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className={classNames(styles.input, error && styles.inputError)}
            {...rest}
          />
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        </div>

        <div className={styles.errorContainer}>{error && <span className={styles.errorMessage}>{error}</span>}</div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
