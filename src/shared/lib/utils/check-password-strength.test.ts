import { describe, expect, it } from 'vitest';
import { checkPasswordStrength } from './check-password-strength';

describe('checkPasswordStrength Utility', () => {
  it('should return all invalid rules for empty password', () => {
    const rules = checkPasswordStrength('');
    rules.forEach((rule) => {
      expect(rule.isValid).toBe(false);
    });
  });

  it('should validate number correctly', () => {
    const rules = checkPasswordStrength('1');
    expect(rules[0].isValid).toBe(true);
    expect(rules[1].isValid).toBe(false);
    expect(rules[2].isValid).toBe(false);
    expect(rules[3].isValid).toBe(false);
  });

  it('should validate uppercase letter correctly', () => {
    const rules = checkPasswordStrength('A');
    expect(rules[0].isValid).toBe(false);
    expect(rules[1].isValid).toBe(true);
    expect(rules[2].isValid).toBe(false);
    expect(rules[3].isValid).toBe(false);
  });

  it('should validate lowercase letter correctly', () => {
    const rules = checkPasswordStrength('a');
    expect(rules[0].isValid).toBe(false);
    expect(rules[1].isValid).toBe(false);
    expect(rules[2].isValid).toBe(true);
    expect(rules[3].isValid).toBe(false);
  });

  it('should validate special character correctly', () => {
    const rules = checkPasswordStrength('!');
    expect(rules[0].isValid).toBe(false);
    expect(rules[1].isValid).toBe(false);
    expect(rules[2].isValid).toBe(false);
    expect(rules[3].isValid).toBe(true);
  });

  it('should return all valid rules for a strong password', () => {
    const rules = checkPasswordStrength('Strong1!');
    rules.forEach((rule) => {
      expect(rule.isValid).toBe(true);
    });
  });
});
