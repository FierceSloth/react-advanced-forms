import { type ReactNode } from 'react';

import styles from './app.module.scss';

export function App(): ReactNode {
  return (
    <>
      <div className={styles.environment} />
      <div className={styles.gridFloor} />

      <div className={styles.container}>
        <h1>Pure Forms</h1>
        <div />
      </div>
    </>
  );
}
