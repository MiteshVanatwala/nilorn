import { useTranslation } from 'react-i18next';
import { FilterInput } from '../../app/types/types';
import FilterSelect from './FilterSelect';
import { useFormContext } from 'react-hook-form';
import { findMultiDefaultValues } from '../../app/utils/FilterHelper';
import useFilterOptions from '../../app/hooks/useFilterOption';
import InputField from '../Form/InputField';

type Props = {
  option: FilterInput;
};

const InputSwitch = ({ option }: Props) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const optionLabel = t(`PD.FilterLabel.${option.name}`);
  const optionValueName = option.name;

  const options = useFilterOptions(option.name);

  switch (option.type) {
    case 'text':
      return (
        <InputField
          label={optionLabel}
          placeholder={`${t('Filter.Enter')} ${optionLabel}`}
          variant="filled"
          name={optionValueName}
        />
      );
    case 'select':
      return (
        <FilterSelect
          label={optionLabel}
          name={optionValueName}
          defaultValue={findMultiDefaultValues(
            options,
            form.getValues(optionValueName)
          )}
          options={options}
        />
      );
  }
};

export default InputSwitch;
