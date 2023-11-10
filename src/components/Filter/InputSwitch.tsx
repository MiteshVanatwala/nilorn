import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../../app/types/types';
import InputField from '../Form/InputField';
import FilterSelect from './FilterSelect';
import { useFormContext } from 'react-hook-form';

type Props = {
  option: SelectOption<AdvanceFilter>;
  defaultValue?: string;
};

const InputSwitch = ({ option, defaultValue }: Props) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const options = [
    { label: 'hejsan', value: 'hejsan' },
    { label: 'hejsan2', value: 'hejsan2' },
  ];
  switch (option.value.type) {
    case 'text':
      return (
        <InputField
          placeholder={`${t('Filter.Enter')} ${option.label}`}
          variant="filled"
          name={option.value.name}
        />
      );
    case 'select':
      return (
        <FilterSelect
          name={option.value.name}
          defaultValue={options.find(
            c => c.value === form.getValues(option.value.name)
          )}
          options={options}
        />
      );
  }
};

export default InputSwitch;
