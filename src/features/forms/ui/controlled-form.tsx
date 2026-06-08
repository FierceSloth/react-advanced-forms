/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from '@/app/store';
import { selectCountries } from '@/app/store/country';
import { type ReactNode } from 'react';

import { addSubmission } from '@/app/store/submission';
import { fileToBase64 } from '@/shared/lib/utils/file-to-base64';
import { createFormSchema, type FormSchemaType } from '@/shared/lib/validations/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type Resolver, type SubmitHandler } from 'react-hook-form';
import { createFinalSubmission } from '../lib/utils/create-final-submission';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { FileInput } from '@/shared/ui/file-input';
import { Input } from '@/shared/ui/input';
import { PasswordStrength } from '@/shared/ui/password-strength';
import { Select } from '@/shared/ui/select';
import styles from './forms.module.scss';

interface IProps {
  onSuccess?: () => void;
}

export function ControlledForm({ onSuccess }: IProps): ReactNode {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(createFormSchema(countries)) as unknown as Resolver<FormSchemaType>,
    mode: 'onChange',
  });

  const currentPassword = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      let base64Image = '';

      if (data.image instanceof File) {
        base64Image = await fileToBase64(data.image);
      }

      const finalData = createFinalSubmission(data, base64Image);

      dispatch(addSubmission(finalData));

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  };

  return (
    <>
      <div className={styles.textContainer}>
        <span className={styles.subtitle}>System.Form // DATA_ENTRY</span>
        <h2 className={styles.title}>Create Profile</h2>
      </div>

      <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input label="Age" placeholder="25" type="number" {...register('age')} error={errors.age?.message} />

          <Input
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Country"
            placeholder="Start typing..."
            list="country-list"
            {...register('country')}
            error={errors.country?.message}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <Select label="Gender" {...register('gender')} error={errors.gender?.message}>
            <option value="" disabled selected>
              Select...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>

          <FileInput label="Profile Picture" {...register('image')} error={errors.image?.message} />

          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <PasswordStrength password={currentPassword} />

          <Checkbox
            label="I agree to the Terms and Conditions"
            {...register('acceptTerms')}
            error={errors.acceptTerms?.message}
          />
        </div>

        <Button className={styles.button} type="submit" disabled={!isValid || isSubmitting}>
          Submit Profile
        </Button>
      </form>
    </>
  );
}
