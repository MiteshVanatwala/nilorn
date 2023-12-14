import { RegisterOptions, ValidationRule } from 'react-hook-form';

export type FilterKeys =
  | 'pageNumber'
  | 'pageSize'
  | 'sortKey'
  | 'searchQuery'
  | 'number'
  | 'client'
  | 'project'
  | 'status'
  | 'itemCategories'
  | 'productGroups'
  | 'foldingTypes'
  | 'finishedLengths'
  | 'finishedWidths'
  | 'finishedHeights'
  | 'sourcingCompanies'
  | 'stockLocation'
  | 'vendor'
  | 'opComp'
  | 'salespersonPurchaser'
  | 'includeClosed'
  | 'ActiveSearchProfile';

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

export type FilterInput = {
  type: 'select' | 'text';
  name: FilterKeys;
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
