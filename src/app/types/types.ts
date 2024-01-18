import { RegisterOptions, ValidationRule } from 'react-hook-form';
import { ChangelogDto } from '../generate';

export type FilterKeys =
  | 'pageNumber'
  | 'pageSize'
  | 'sortKey'
  | 'searchQuery'
  | 'number'
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
  | 'vendor'
  | 'opComp'
  | 'salespersonPurchaser'
  | 'includeClosed'
  | 'ActiveSearchProfile'
  | 'productDevelopments';

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
  changelog?: ChangelogDto[];
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
