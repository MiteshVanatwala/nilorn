import { RegisterOptions, ValidationRule } from 'react-hook-form';

export enum OrderState {
  'CURRENT',
  'REVIEW',
  'TRACKING',
}

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

export type LabelValue = {
  label: string;
  value: string;
};

export enum FieldState {
  'NEUTRAL',
  'VALID',
  'ERROR',
}

export enum CalcMethod {
  INCREASE_PERC,
  DECREASE_PERC,
  INCREASE_PCS,
  DECREASE_PCS,
  CHANGE_PCS,
}
