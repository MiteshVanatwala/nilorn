import { RegisterOptions, ValidationRule } from 'react-hook-form';

export interface FormInputProps {
  name: string;
  id?: string;
  label?: JSX.Element | string | null;
  description?: string;
  required?: string | ValidationRule<boolean> | undefined;
  helperText?: string;
  inline?: boolean;
  registerOptions?: RegisterOptions;
  defaultValue?: any;
  hideValidationStyle?: boolean;
  onChange?: (e: any) => void;
}

export type SelectOption<T = any> = {
  label: any;
  value: T;
};

export type AdvanceFilter = {
  type: 'select' | 'text';
  name: string;
};

export type Status = 'success' | 'error' | 'warning' | 'info';

export type Feedback = {
  status: Status;
  title?: string;
  size?: 'md' | 'sm';
  description?: string;
};
export enum FieldState {
  'NEUTRAL',
  'VALID',
  'ERROR',
}
