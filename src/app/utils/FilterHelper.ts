import { ColumnSort } from '@tanstack/table-core';
import { SelectOption } from '../types/types';
import { useEffect, useState } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { SortingState } from '@tanstack/table-core';
import { INCLUDE_CLOSED, PAGE_SIZE, SEARCH_QUERY, SESSION_STORAGE } from './constant';
import { allFilters } from '../hooks/useFilterList';

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
    if (value !== undefined && value !== '') {
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

export const transformToFilterData = (obj: {
  [key: string]: any;
}): {
  [key: string]: string | boolean;
} => {
  const transformedObj: any = { ...obj };

  Object.keys(transformedObj).forEach(key => {
    if (Array.isArray(transformedObj[key])) {
      transformedObj[key] = (transformedObj[key] as SelectOption[]).map(
        item => {
          if (typeof item === 'object' && item?.value !== undefined) {
            return item.value;
          }
          return item;
        }
      );
    } else if (
      typeof transformedObj[key] === 'object' &&
      transformedObj[key]?.value !== undefined
    ) {
      transformedObj[key] = transformedObj[key].value;
    } else if (typeof transformedObj[key] === 'string') {
      transformedObj[key] = converFilterDataOnType(key, transformedObj[key]);
    }
  });

  return transformedObj;
};

export function useFormStateFilters() {
  const watch = useWatch();
  return transformToFilterData(watch);
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
  if (window.location.pathname.includes('/productions')) {
    storedFilter = SESSION_STORAGE.PREV_FILTER_PRODUCTIONS;
  } else if (window.location.pathname === '/') {
    storedFilter = SESSION_STORAGE.PREV_FILTER_OVERVIEW;
  } else if (window.location.pathname.includes('/price-calculations')) {
    storedFilter = SESSION_STORAGE.PREV_FILTER_CALCULATION;
  }
  return storedFilter;
}

export function parseSearchParams(queryStr: string): Record<string, string> {
  const searchParams = new URLSearchParams(queryStr);
  const parsedParams: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    parsedParams[key] =
      key === SEARCH_QUERY ? value : decodeURIComponent(value);
  });

  return parsedParams;
}

function converFilterDataOnType(
  key: string,
  value: string
): string | boolean | string[] {
  const filter = allFilters.find(f => f.name === key);
  if (filter && filter.type === 'select') {
    return value.split(',');
  } else if (key === INCLUDE_CLOSED) {
    return value === 'true' || value;
  } else {
    return value;
  }
}

export function convertQueryStringToFilterObject(
  queryStr: string
): Record<string, string | boolean | string[]> {
  const parsed = parseSearchParams(queryStr);
  const result: Record<string, string | boolean | string[]> = {};

  for (const key in parsed) {
    const value = parsed[key];
    if (value === '') continue;
    result[key] = converFilterDataOnType(key, value);
  }

  return result;
}
export function useClearAllFilters() {
  const { unregister, getValues, reset } = useFormContext();

  const clearFilters = () => {
    const pageSize = getValues(PAGE_SIZE);
    unregister();
    reset({
      [PAGE_SIZE]: pageSize,
    });
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem(storedFilter, '');
  };

  return clearFilters;
}
