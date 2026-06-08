import { describe, expect, it } from 'vitest';
import { createFormSchema } from './form-schema';

describe('Form Schema Validation', () => {
  const validCountries = ['USA', 'UK', 'Canada'];
  const schema = createFormSchema(validCountries);

  const createMockFileList = (files: File[]): FileList => {
    const fileList = {
      length: files.length,
      item: (index: number) => files[index] ?? null,
    } as FileList;

    files.forEach((file, index) => {
      (fileList as any)[index] = file;
    });

    return fileList;
  };

  const validImageFile = new File(['image'], 'test.png', { type: 'image/png' });

  const validFormData = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    country: 'USA',
    image: createMockFileList([validImageFile]),
    acceptTerms: true,
  };

  it('should validate correct data successfully', () => {
    const result = schema.safeParse(validFormData);
    expect(result.success).toBe(true);
  });

  describe('Name Validation', () => {
    it('should reject empty name', () => {
      const result = schema.safeParse({ ...validFormData, name: '' });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.name).toContain('Name is required');
    });

    it('should reject name starting with lowercase', () => {
      const result = schema.safeParse({ ...validFormData, name: 'john' });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.name).toContain('The name must begin with a capital letter');
    });
  });

  describe('Age Validation', () => {
    it('should reject negative age', () => {
      const result = schema.safeParse({ ...validFormData, age: -5 });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.age).toContain('Age cannot be negative');
    });

    it('should reject age below 18', () => {
      const result = schema.safeParse({ ...validFormData, age: 17 });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.age).toContain('You must be at least 18 years old to register');
    });

    it('should reject age above 150', () => {
      const result = schema.safeParse({ ...validFormData, age: 151 });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.age).toContain('Are you sure?');
    });
  });

  describe('Email Validation', () => {
    it('should reject email without @', () => {
      const result = schema.safeParse({ ...validFormData, email: 'john.com' });
      expect(result.success).toBe(false);
    });

    it('should reject email without domain dot', () => {
      const result = schema.safeParse({ ...validFormData, email: 'john@example' });
      expect(result.success).toBe(false);
    });

    it('should reject email with empty local part', () => {
      const result = schema.safeParse({ ...validFormData, email: '@example.com' });
      expect(result.success).toBe(false);
    });

    it('should reject email with multiple @', () => {
      const result = schema.safeParse({ ...validFormData, email: 'john@foo@example.com' });
      expect(result.success).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should reject weak password', () => {
      const result = schema.safeParse({ ...validFormData, password: 'weak', confirmPassword: 'weak' });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.password).toContain(
          'The password does not meet all security requirements'
        );
    });

    it('should reject mismatched passwords', () => {
      const result = schema.safeParse({ ...validFormData, password: 'Password1!', confirmPassword: 'Password2!' });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.confirmPassword).toContain('The passwords do not match');
    });
  });

  describe('Country Validation', () => {
    it('should reject invalid country', () => {
      const result = schema.safeParse({ ...validFormData, country: 'Germany' });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.country).toContain('Select a country from the list below');
    });
  });

  describe('Image Validation', () => {
    it('should reject empty file list', () => {
      const result = schema.safeParse({ ...validFormData, image: createMockFileList([]) });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.image).toContain('Please upload a file');
    });

    it('should reject invalid file type', () => {
      const invalidFile = new File(['text'], 'test.txt', { type: 'text/plain' });
      const result = schema.safeParse({ ...validFormData, image: createMockFileList([invalidFile]) });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.image).toContain('Only .jpg and .png formats');
    });

    it('should reject file exceeding size', () => {
      const largeFile = new File([new ArrayBuffer(6_000_000)], 'large.png', { type: 'image/png' });
      Object.defineProperty(largeFile, 'size', { value: 6_000_000 });
      const result = schema.safeParse({ ...validFormData, image: createMockFileList([largeFile]) });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.flatten().fieldErrors.image).toContain('File size must not exceed 5 MB');
    });
  });

  describe('Terms Validation', () => {
    it('should reject if terms not accepted', () => {
      const result = schema.safeParse({ ...validFormData, acceptTerms: false });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.error.flatten().fieldErrors.acceptTerms).toContain('You must accept the terms and conditions');
    });
  });
});
