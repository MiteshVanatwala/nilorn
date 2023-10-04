export function getDefaultValueSelect(
  selectValue: string,
  options: SelectOption[]
) {
  const defaultValue = options?.find(
    pv => pv.value === selectValue
  ) as SelectOption;
  return defaultValue;
}

export type SelectOption = {
  label: any;
  value: any;
};

export type GroupSelectOption = {
  label: string;
  options: SelectOption[];
};
