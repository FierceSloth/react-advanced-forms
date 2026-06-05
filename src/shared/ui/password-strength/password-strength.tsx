import classNames from 'classnames';
import type { ReactNode } from 'react';

import styles from './password-strength.module.scss';

interface IProps {
  className?: string;
  password?: string;
}

export function PasswordStrength({ password = '', className }: IProps): ReactNode {
  const rules = [
    { text: '1 number', isValid: /\d/.test(password) },
    { text: '1 uppercase letter', isValid: /[A-Z]/.test(password) },
    { text: '1 lowercase letter', isValid: /[a-z]/.test(password) },
    { text: '1 special character', isValid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles.label}>Password Strength</label>
      <ul className={styles.ruleList}>
        {rules.map((rule) => (
          <li key={rule.text} className={styles.rule}>
            <span
              className={classNames(styles.dot, {
                [styles.dotValid]: rule.isValid,
              })}
            />
            <span
              className={classNames(styles.text, {
                [styles.textValid]: rule.isValid,
              })}
            >
              {rule.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
