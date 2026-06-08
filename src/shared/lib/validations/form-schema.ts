/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { checkPasswordStrength } from '@/shared/lib/utils/check-password-strength';
import z from 'zod';

export const createFormSchema = (validCountries: string[]) => {
  return z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((value) => {
          if (!value) return false;
          return value[0] === value[0].toUpperCase();
        }, 'The name must begin with a capital letter'),

      age: z.coerce
        .number()
        .int('Age must be an integer')
        .min(0, 'Age cannot be negative')
        .max(150, 'Are you sure?')
        .refine((value) => value >= 18, {
          message: 'You must be at least 18 years old to register',
        }),

      email: z.string().refine((value) => {
        const parts = value.trim().split('@');
        if (parts.length !== 2) return false;

        const [localPart, domainPart] = parts;

        if (localPart.length === 0) return false;
        if (!domainPart.includes('.')) return false;

        return true;
      }, 'Invalid email format'),

      gender: z.string().min(1, 'Select gender'),

      password: z
        .string()
        .min(1, 'Enter your password')
        .refine((value) => {
          const rules = checkPasswordStrength(value);
          return rules.every((rule) => rule.isValid);
        }, 'The password does not meet all security requirements'),
      confirmPassword: z.string().min(1, 'Confirm your password'),

      country: z.string().refine((value) => validCountries.includes(value), 'Select a country from the list below'),

      image: z
        .file('Please upload a file')
        .refine((file) => file?.size <= 5_000_000, 'File size must not exceed 5 MB')
        .refine((file) => ['image/jpeg', 'image/png'].includes(file?.type), 'Only .jpg and .png formats'),

      acceptTerms: z.boolean().refine((value) => value === true, 'You must accept the terms and conditions'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'The passwords do not match',
      path: ['confirmPassword'],
    });
};

export type FormSchemaType = z.infer<ReturnType<typeof createFormSchema>>;
