// src/app/data/password-requirements.ts

import type { PasswordRequirement } from '../types/auth.types';

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    test: (password: string): boolean => password.length >= 8,
  },
  {
    label: 'Contains uppercase letter',
    test: (password: string): boolean => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password: string): boolean => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password: string): boolean => /\d/.test(password),
  },
  {
    label: 'Contains special character',
    test: (password: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];
