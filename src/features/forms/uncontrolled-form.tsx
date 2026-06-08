import { useAppSelector } from '@/app/store';
import { selectCountries } from '@/app/store/country';
import { useState, type ReactNode } from 'react';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { FileInput } from '@/shared/ui/file-input';
import { Input } from '@/shared/ui/input';
import { PasswordStrength } from '@/shared/ui/password-strength';

import { Select } from '@/shared/ui/select';
import styles from './forms.module.scss';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
};

export function UncontrolledForm(): ReactNode {
  const countries = useAppSelector(selectCountries);
  const [currentPassword, setCurrentPassword] = useState('');

  return (
    <>
      <div className={styles.textContainer}>
        <span className={styles.subtitle}>System.Form // DATA_ENTRY</span>
        <h2 className={styles.title}>Create Profile</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <Input name="name" label="Full Name" placeholder="John Doe" type="text" />
          <Input name="age" label="Age" placeholder="25" type="number" />
          <Input name="email" label="Email Address" placeholder="john@example.com" type="email" />

          <Input name="country" label="Country" placeholder="Start typing..." list="country-list" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <Select name="gender" label="Gender">
            <option value="" disabled selected>
              Select...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>

          <FileInput name="image" label="Profile Picture" />

          <Input
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <Input name="confirmPassword" label="Confirm Password" placeholder="••••••••" type="password" />

          <PasswordStrength password={currentPassword} />

          <Checkbox name="acceptTerms" label="I agree to the Terms and Conditions" />
        </div>

        <Button className={styles.button} type="submit">
          Submit Profile
        </Button>
      </form>
    </>
  );
}
