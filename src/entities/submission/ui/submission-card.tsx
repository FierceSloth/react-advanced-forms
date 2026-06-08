import type { ICardEntity } from '@/app/store/submission';
import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import { GlassCard } from '@/shared/ui/glass-card';

import styles from './submission-card.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  entity: ICardEntity;
}

interface IFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  valueClassName?: string;
}

function FieldGroup({ label, children, className, valueClassName }: IFieldProps): ReactNode {
  return (
    <div className={classNames(styles.fieldGroup, className)}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={classNames(styles.fieldValue, valueClassName)}>{children}</div>
    </div>
  );
}

export function SubmissionCard({ className, entity, ...rest }: IProps): ReactNode {
  const formattedDate = new Date(entity.timestamp).toLocaleDateString();

  return (
    <GlassCard className={classNames(styles.submissionCard, className)} {...rest}>
      <div className={styles.cardHeader}>
        {entity.image ? (
          <img src={entity.image} alt={entity.name} />
        ) : (
          <div className={styles.avatarCircle}>{entity.name.charAt(0).toUpperCase()}</div>
        )}

        <div className={styles.cardMeta}>
          <div className={styles.metaId}>ID: {entity.id}</div>
          <div className={styles.metaTime}>{formattedDate}</div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <FieldGroup label="Full Name" valueClassName={styles.name}>
          {entity.name}
        </FieldGroup>

        <div className={styles.fieldRow}>
          <FieldGroup label="Age">{entity.age}</FieldGroup>
          <FieldGroup label="Gender">{entity.gender || 'Not specified'}</FieldGroup>
        </div>

        <FieldGroup label="Email Address">{entity.email}</FieldGroup>

        <FieldGroup label="Country">
          <span>{entity.country}</span>
        </FieldGroup>
      </div>
    </GlassCard>
  );
}
