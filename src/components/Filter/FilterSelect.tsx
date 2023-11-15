import { FC, useEffect } from 'react';
import Select from '../Form/Select';
import { SelectOption } from '../../app/types/types';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  defaultValue?: SelectOption;
  options: SelectOption[];
  label?: string;
};

const FilterSelect: FC<Props> = ({ name, defaultValue, options, label }) => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      if (getValues(name)?.value !== defaultValue?.value) {
        setValue(name, defaultValue);
      }
    }
  }, [defaultValue, getValues, name, setValue]);

  return (
    <>
      {defaultValue && (
        <Select
          label={label}
          name={name}
          defaultValue={defaultValue}
          options={options}
        />
      )}
      {!defaultValue && <Select label={label} name={name} options={options} />}
    </>
  );
};

export default FilterSelect;
