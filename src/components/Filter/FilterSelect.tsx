import { FC, useEffect } from 'react';
import Select from '../Form/Select';
import { FilterKeys, SelectOption } from '../../app/types/types';
import { useFormContext } from 'react-hook-form';
import { MultiValue } from 'chakra-react-select';

type Props = {
  name: FilterKeys;
  defaultValue?: MultiValue<SelectOption>;
  options: SelectOption[];
  label?: string;
};

const FilterSelect: FC<Props> = ({ name, defaultValue, options, label }) => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      if (typeof getValues(name) === 'string') {
        let tmp: SelectOption[] = [];
        defaultValue.forEach(dv => {
          if (getValues(name)?.value !== dv?.value) {
            tmp.push(dv);
          }
        });
        setValue(name, defaultValue);
      }
    }
  }, [defaultValue, getValues, name, setValue]);

  return (
    <>
      {defaultValue && (
        <Select
          isMulti
          showSelectedCount
          label={label}
          name={name}
          defaultValue={defaultValue}
          options={options}
        />
      )}
      {!defaultValue && (
        <Select
          isMulti
          showSelectedCount
          label={label}
          name={name}
          options={options}
        />
      )}
    </>
  );
};

export default FilterSelect;
