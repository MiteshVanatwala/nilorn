import { FC } from 'react';
import Select from '../Form/Select';
import { FormLabel } from '@chakra-ui/react';
import { SelectOption } from '../../app/types/types';

type Props = {
  name: string;
  defaultValue?: SelectOption;
  options: any;
  formLabel?: string;
};

const FilterSelect: FC<Props> = ({
  name,
  defaultValue,
  options,
  formLabel,
}) => {
  return (
    <>
      {formLabel && (
        <FormLabel mb={'.4rem'} htmlFor={name}>
          {formLabel}
        </FormLabel>
      )}
      {defaultValue && (
        <Select name={name} defaultValue={defaultValue} options={options} />
      )}
      {!defaultValue && <Select name={name} options={options} />}
    </>
  );
};

export default FilterSelect;
