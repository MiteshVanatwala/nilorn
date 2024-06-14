import { RegisterOptions, ValidationRule } from 'react-hook-form';
import {
  ChangelogItemDto,
  GetForFilterProductDevelopmentsWithPaginationQuery,
} from '../generate';
import { Location } from 'react-router';

export type FilterKeys =
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
  type: 'select' | 'text' | 'number';
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

export type LocationsProps = {
  currentLocation: Location<any>;
  nextLocation: Location<any>;
};

export enum DownloadFileType {
  EXCEL = 'excel',
  MEDIA = 'media',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
}
