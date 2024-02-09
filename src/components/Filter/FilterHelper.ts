import { FilterKeys } from '../../app/types/types';
import { ColumnSort } from '@tanstack/table-core';
import { SelectOption } from '../../app/types/types';
import { useEffect, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { SortingState } from '@tanstack/table-core';

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
  options: SelectOptionFilter[];
};
export type SelectOptionFilter = {
  label: string;
  value: string;
  filterName: string;
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
      if (typeof value === 'string' || typeof value === 'number') {
        result[key] = value.toString();
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

export function findMultiDefaultValues(
  allOptions: SelectOption[],
  filterParam: string | SelectOption[]
): SelectOption[] | undefined {
  if (filterParam === undefined || allOptions.length === 0) {
    return undefined;
  }

  if (Array.isArray(filterParam)) {
    return filterParam;
  } else if (typeof filterParam === 'string') {
    const filterValues = filterParam
      .split(',')
      .map(value => value.toLowerCase().trim());

    const filteredObjects = allOptions.filter(obj =>
      filterValues.includes(obj.value.toLowerCase())
    );
    return filteredObjects;
  }
}

/**
 * @deprecated Use useFilterFormSearchParams and within the formcontext instead.
 */
export function useFilterSearchParams(
  name: FilterKeys,
  delay: number = 0
): string | undefined {
  const [searchParam] = useSearchParams();
  const value = useDebounce(searchParam.get(name), delay);

  return value ?? undefined;
}

export function useFilterFormSearchParams(
  name: FilterKeys,
  delay: number = 0
): string | undefined {
  const { watch } = useFormContext();

  const value = useDebounce(
    Array.isArray(watch(name))
      ? (watch(name) as SelectOption[])?.map(v => v.value).join(',')
      : watch(name),
    delay
  );

  return value ?? undefined;
}

export function getSortValue(columnSort: ColumnSort): string {
  return `${columnSort.id}${columnSort.desc ? 'D' : 'A'}`;
}

export function getSortState(sortValue: string): SortingState {
  const match = sortValue.match(/([a-zA-Z]+)([a-zA-Z\d])$/);
  const [, id, value] = match as [string, string, string];
  const result: { id: string; value: string } = { id, value };

  return [{ id: result.id, desc: result.value === 'D' }];
}
export function getCurrentStoredFilter() {
  let storedFilter = '';
  if (window.location.pathname === '/productions') {
    storedFilter = 'prevFilterProductions';
  } else if (window.location.pathname === '/') {
    storedFilter = 'prevFilterOverview';
  } else if (window.location.pathname === '/price-calculations') {
    storedFilter = 'prevFilterCalculation';
  }
  return storedFilter;
}
