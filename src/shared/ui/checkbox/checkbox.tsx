import classNames from 'classnames';
import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import styles from './checkbox.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Checkbox({ label, error, className, ref, id, ...rest }: IProps): ReactNode {
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
