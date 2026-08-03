import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PasswordStrength } from './password-strength';

describe('PasswordStrength Component', () => {
  it('should render all rule texts', () => {
    render(<PasswordStrength password="" />);

    expect(screen.getByText('1 number')).toBeInTheDocument();
    expect(screen.getByText('1 uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('1 special character')).toBeInTheDocument();
  });

  it('should validate 1 number correctly', () => {
    render(<PasswordStrength password="1" />);

    const ruleElement = screen.getByText('1 number');
    expect(ruleElement.className).toContain('textValid');
  });

  it('should validate 1 uppercase letter correctly', () => {
    render(<PasswordStrength password="A" />);

    const ruleElement = screen.getByText('1 uppercase letter');
    expect(ruleElement.className).toContain('textValid');
  });

  it('should validate 1 lowercase letter correctly', () => {
    render(<PasswordStrength password="a" />);

    const ruleElement = screen.getByText('1 lowercase letter');
    expect(ruleElement.className).toContain('textValid');
  });

  it('should validate 1 special character correctly', () => {
    render(<PasswordStrength password="!" />);

    const ruleElement = screen.getByText('1 special character');
    expect(ruleElement.className).toContain('textValid');
  });

  it('should validate all rules for strong password', () => {
    render(<PasswordStrength password="Password1!" />);

    expect(screen.getByText('1 number').className).toContain('textValid');
    expect(screen.getByText('1 uppercase letter').className).toContain('textValid');
    expect(screen.getByText('1 lowercase letter').className).toContain('textValid');
    expect(screen.getByText('1 special character').className).toContain('textValid');
  });
});
