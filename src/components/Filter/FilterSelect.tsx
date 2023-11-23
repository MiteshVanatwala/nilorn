import { FC, useEffect } from 'react';
import Select from '../Form/Select';
import { SelectOption } from '../../app/types/types';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'chakra-react-select';

type Props = {
  name: string;
  defaultValue?: SelectOption;
  options: SelectOption[];
  label?: string;
};

const FilterSelect: FC<Props> = ({ name, defaultValue, options, label }) => {
  const { t } = useTranslation();
  const { setValue, getValues } = useFormContext();

  // const x: MultiValue<SelectOption> = [
  //   { label: 'Chocolate client', value: 'chocolate' },
  //   { label: 'Strawberry client', value: 'strawberry' },
  // ];
  console.log('defaultValue', name, defaultValue);
  useEffect(() => {
    if (defaultValue) {
      if (getValues(name)?.value !== defaultValue?.value) {
        setValue(name, defaultValue);
      }
    }

    // if (x.length) {
    //   x.map(f => {
    //     if (getValues(name)?.value !== f) {
    //       setValue(name, c);
    //     }
    //   });
    // }
  }, [defaultValue, getValues, name, setValue]);
  return (
    <>
      {defaultValue && (
        <Select
          isMulti={true}
          label={label}
          name={name}
          // defaultValue={defaultValue}
          options={options}
          placeholder={
            1
              ? `${t('Filter.NumSelected', { num: 2 })}`
              : `${t('Filter.Select')}`
          }
        />
      )}
      {!defaultValue && (
        <Select
          isMulti
          label={label}
          name={name}
          options={options}
          // defaultValue={x}
        />
      )}
    </>
  );
};

export default FilterSelect;
