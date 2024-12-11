import { useTranslation } from 'react-i18next';
import { FilterInput } from '../../app/types/types';
import FilterSelect from './FilterSelect';
import { useFormContext } from 'react-hook-form';
import { findMultiDefaultValues } from '../../app/utils/FilterHelper';
import useFilterOptions from '../../app/hooks/useFilterOption';
import InputField from '../Form/InputField';
import FilterNumberInputField from './FilterNumberInputfield';

type Props = {
  option: FilterInput;
};

const InputSwitch = ({ option }: Props) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const { name, type } = option || {};
  const optionLabel = t(`PD.FilterLabel.${name}`);

  const options = useFilterOptions(name);

  switch (type) {
    case 'text':
      return (
        <InputField
          label={optionLabel}
          hideValidationStyle
          placeholder={`${t('Filter.Enter')} ${optionLabel}`}
          variant="filled"
          name={name}
        />
      );
    case 'select':
      return (
        <FilterSelect
          label={optionLabel}
          name={name}
          defaultValue={findMultiDefaultValues(options, form.getValues(name))}
          options={options}
        />
      );

    case 'integer':
    case 'decimal':
      return (
        <FilterNumberInputField
          label={optionLabel}
          placeholder={`${t('Filter.Enter')} ${optionLabel}`}
          name={name}
          type={type}
        />
      );
  }
};

export default InputSwitch;
