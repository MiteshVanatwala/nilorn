import { RegisterOptions, ValidationRule } from 'react-hook-form';

export type FilterKeys =
  | 'pageNumber'
  | 'pageSize'
  | 'sortKey'
  | 'searchQuery'
  | 'clients'
  | 'projects'
  | 'statuses'
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
  | 'salespersonPurchaser';

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
  name: FilterKeys;
  options?: SelectOption[];
  test?: any;
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
