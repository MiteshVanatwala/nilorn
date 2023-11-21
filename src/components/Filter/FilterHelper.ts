import { SelectOption } from '../../app/types/types';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

export function getDefaultValueSelect(
  selectValue: string,
  options: SelectOption[]
) {
  const defaultValue = options?.find(
    pv => pv.value === selectValue
  ) as SelectOption;
  return defaultValue;
}

export type GroupSelectOption = {
  label: string;
  options: SelectOption[];
};

export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function onFilterChange(formValues: FieldValues) {
  const output = Object.entries(formValues).reduce((result, [key, value]) => {
    if (key !== 'ActiveSearchProfile' && value !== undefined && value !== '') {
      if (typeof value === 'string') {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = (value as SelectOption[]).map(v => v.value) as string[];
      } else if (value && typeof value === 'object' && 'value' in value) {
        result[key] = value.value;
      }
    }
    return result;
  }, {} as Record<string, string | string[]>);

  const queryParamString = Object.entries(output)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryParamString;
}
