import { type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { Input } from '@/shared/ui/input';

import classNames from 'classnames';
import styles from './file-input.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function FileInput(props: IProps): ReactNode {
  return <Input className={classNames(styles.fileInput, props.className)} {...props} type="file" />;
}
