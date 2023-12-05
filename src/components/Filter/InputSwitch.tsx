import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../../app/types/types';
import FilterSelect from './FilterSelect';
import { useFormContext } from 'react-hook-form';
import { findMultiDefaultValues } from './FilterHelper';
import useFilterOptions from '../../app/hooks/useFilterOption';
import InputField from '../Form/InputField';

type Props = {
  option: SelectOption<AdvanceFilter>;
  filterLabel?: string;
};

const InputSwitch = ({ option, filterLabel }: Props) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const optionValueName = option.value.name;
  const options = useFilterOptions(optionValueName);

  switch (option.value.type) {
    case 'text':
      return (
        <InputField
          placeholder={`${t('Filter.Enter')} ${option.label}`}
          variant="filled"
          name={optionValueName}
        />
      );
    case 'select':
      return (
        <FilterSelect
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
