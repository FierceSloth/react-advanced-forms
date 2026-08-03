export interface IPasswordRule {
  text: string;
  isValid: boolean;
}

export function checkPasswordStrength(password: string): IPasswordRule[] {
  return [
    { text: '1 number', isValid: /\d/.test(password) },
    { text: '1 uppercase letter', isValid: /[A-Z]/.test(password) },
    { text: '1 lowercase letter', isValid: /[a-z]/.test(password) },
    { text: '1 special character', isValid: /[^A-Za-z0-9]/.test(password) },
  ];
}
