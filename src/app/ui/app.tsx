import { useState, type ReactNode } from 'react';

import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { GlassCard } from '@shared/ui/glass-card';
import { Input } from '@shared/ui/input';
import { Modal } from '@shared/ui/modal';
import { PasswordStrength } from '@shared/ui/password-strength';

import { UncontrolledForm } from '@/features/forms/uncontrolled-form';
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
        <UncontrolledForm />
      </Modal>
    </>
  );
}
