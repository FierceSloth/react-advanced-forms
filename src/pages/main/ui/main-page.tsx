/* eslint-disable react-hooks/purity */
import { useState, type ReactNode } from 'react';

import { useAppSelector } from '@/app/store';
import { selectSubmissions } from '@/app/store/submission/selectors';

import { SubmissionCard } from '@/entities/submission';
import { ControlledForm, UncontrolledForm } from '@/features/forms';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

import styles from './main-page.module.scss';

type FormType = 'uncontrolled' | 'controlled' | null;

export function MainPage(): ReactNode {
  const submissions = useAppSelector(selectSubmissions);

  const [activeForm, setActiveForm] = useState<FormType>(null);
  const closeModal = (): void => setActiveForm(null);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.subtitle}>Manage and review all submitted entries</p>
          <h1 className={styles.title}>Submission Archive</h1>
        </div>

        <div className={styles.actions}>
          <Button className={styles.button} onClick={() => setActiveForm('uncontrolled')}>
            Open Uncontrolled Form
          </Button>
          <Button className={styles.button} onClick={() => setActiveForm('controlled')}>
            Open React Hook Form
          </Button>
        </div>
      </header>

      <main className={styles.grid}>
        {submissions.length === 0 ? (
          <div className={styles.emptyState}>No submissions yet. Create one!</div>
        ) : (
          submissions.map((sub) => {
            const isNew = Date.now() - sub.timestamp < 3000;
            return <SubmissionCard key={sub.id} entity={sub} className={isNew ? styles.newCardGlow : undefined} />;
          })
        )}
      </main>

      <Modal isOpen={activeForm !== null} onClose={closeModal}>
        {activeForm === 'uncontrolled' && <UncontrolledForm onSuccess={closeModal} />}
        {activeForm === 'controlled' && <ControlledForm onSuccess={closeModal} />}
      </Modal>
    </div>
  );
}
