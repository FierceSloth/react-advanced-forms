import { useState, type ReactNode } from 'react';

import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { GlassCard } from '@shared/ui/glass-card';
import { Input } from '@shared/ui/input';
import { Modal } from '@shared/ui/modal';
import { PasswordStrength } from '@shared/ui/password-strength';

import { FileInput } from '@/shared/ui/file-input';
import styles from './app.module.scss';

export function App(): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <>
      <div className={styles.environment} />
      <div className={styles.gridFloor} />

      <div className={styles.container}>
        <h1 className={styles.title}>UI Kit</h1>

        <div className={styles.uiGrid}>
          <GlassCard className={styles.demoCard}>
            <h2>Text Inputs</h2>
            <div className={styles.cardContent}>
              <Input label="Email Address" placeholder="hello@example.com" />
              <Input label="Username" placeholder="Enter username" error="This username is already taken" />
              <FileInput label="Profile Picture" />
              <div className={styles.passwordSection}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
                <PasswordStrength password={passwordValue} />
              </div>
            </div>
          </GlassCard>

          <GlassCard className={styles.demoCard}>
            <h2>Controls & Interactions</h2>
            <div className={styles.cardContent}>
              <Checkbox label="I accept the Terms and Conditions" />
              <Checkbox label="I accept the Terms and Conditions" error="This field is required" />

              <div className={styles.divider} />

              <Button onClick={() => setIsModalOpen(true)}>Open Glass Modal</Button>
            </div>
          </GlassCard>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sequi aperiam neque debitis, fuga dicta
            pariatur atque, quia repudiandae rerum accusamus provident beatae quidem consequatur officia aspernatur
            porro ducimus. Neque!
          </p>
          <div className={styles.modalActions}>
            <Button onClick={() => setIsModalOpen(false)}>Close Modal</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
