import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../../app/types/types';
import InputField from '../Form/InputField';
import Select from '../Form/Select';

type Props = {
  option: SelectOption<AdvanceFilter>;
};

const InputSwitch = ({ option }: Props) => {
  const { t } = useTranslation();

  switch (option.value.type) {
    case 'text':
      return (
        <InputField
          placeholder={`${t('Filter.Enter')} ${option.label}`}
          variant="filled"
          name={option.label.toLowerCase().replace(/ /g, '')}
        />
      );
    case 'select':
      return <Select name={option.value.name} options={[]} />;
  }
};

export default InputSwitch;
