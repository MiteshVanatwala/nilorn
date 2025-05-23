import { useMemo } from 'react';
import { SelectOption } from '../types/types';

export const useSelectedOption = <T,>(
  options?: SelectOption<T>[],
  selectedValue?: T
) => {
  return useMemo(
    () =>
      options && selectedValue
        ? options.find(o => o.value === selectedValue)
        : null,
    [options, selectedValue]
  );
};
