import { RegisterOptions, ValidationRule } from 'react-hook-form';
import {
  ChangelogItemDto,
  GetForFilterProductDevelopmentsWithPaginationQuery,
} from '../generate';
import { Location } from 'react-router';

export type UmbrellaView =
  | 'production'
  | 'price-calculation'
  | 'overview'
  | 'sourcing';

export type FilterKey =
  | keyof GetForFilterProductDevelopmentsWithPaginationQuery;

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
  changelog?: ChangelogItemDto[];
}

export type SelectOption<T = any> = {
  label: any;
  value: T;
};

export type FilterInput = {
  type: 'select' | 'text' | 'integer' | 'decimal';
  name: FilterKey;
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

export type LocationsProps = {
  currentLocation: Location<any>;
  nextLocation: Location<any>;
};

export enum StatusColor {
  NEW = 'blue',
  DESIGN = 'purple',
  ARTWORK = 'orange',
  SOURCING = 'gray',
  CALCULATION = 'yellow',
  APPROVED = 'green',
  REJECTED = 'red',
  DELETED = 'red',
}
