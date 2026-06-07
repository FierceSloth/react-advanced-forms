import classNames from 'classnames';
import type { ReactNode } from 'react';

import { checkPasswordStrength } from '@/shared/lib/utils/check-password-strength';
import styles from './password-strength.module.scss';

interface IProps {
  className?: string;
  password?: string;
}

export function PasswordStrength({ password = '', className }: IProps): ReactNode {
  const rules = checkPasswordStrength(password);

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
