import { useAppDispatch, useAppSelector } from '@/app/store';
import { selectCountries } from '@/app/store/country';
import { useState, type ReactNode } from 'react';

import { addSubmission } from '@/app/store/submission';
import { fileToBase64 } from '@/shared/lib/utils/file-to-base64';
import { createFormSchema } from '@/shared/lib/validations/form-schema';
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

export function UncontrolledForm({ onSuccess }: IProps): ReactNode {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const [currentPassword, setCurrentPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const rawData = Object.fromEntries(formData.entries());

    const dataToValidate = {
      ...rawData,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    const schema = createFormSchema(countries);
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const zodErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};

      Object.entries(zodErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          formattedErrors[key] = messages[0];
        }
      });

      setErrors(formattedErrors);
      return;
    }

    setErrors({});

    try {
      let base64Image = '';
      if (result.data.image instanceof File) {
        base64Image = await fileToBase64(result.data.image);
      }

      const finalData = createFinalSubmission(result.data, base64Image);

      dispatch(addSubmission(finalData));

      setCurrentPassword('');
      formElement.reset();

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

      <form className={styles.form} noValidate onSubmit={(event) => void handleSubmit(event)}>
        <div className={styles.inputContainer}>
          <Input name="name" label="Full Name" placeholder="John Doe" type="text" error={errors?.name} />
          <Input name="age" label="Age" placeholder="25" type="number" error={errors?.age} />
          <Input name="email" label="Email Address" placeholder="john@example.com" type="email" error={errors?.email} />

          <Input
            name="country"
            label="Country"
            placeholder="Start typing..."
            list="country-list"
            error={errors?.country}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <Select name="gender" label="Gender" error={errors?.gender}>
            <option value="" disabled selected>
              Select...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>

          <FileInput name="image" label="Profile Picture" error={errors?.image} />

          <Input
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            onChange={(event) => setCurrentPassword(event.target.value)}
            error={errors?.password}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            error={errors?.confirmPassword}
          />

          <PasswordStrength password={currentPassword} />

          <Checkbox name="acceptTerms" label="I agree to the Terms and Conditions" error={errors?.acceptTerms} />
        </div>

        <Button className={styles.button} type="submit">
          Submit Profile
        </Button>
      </form>
    </>
  );
}
