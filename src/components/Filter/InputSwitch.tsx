import { AdvanceFilter, SelectOption } from '../../app/types/types';
import InputField from '../Form/InputField';
import Select from '../Form/Select';

type Props = {
  option: SelectOption<AdvanceFilter>;
};

const InputSwitch = ({ option }: Props) => {
  switch (option.value.type) {
    case 'text':
      return <InputField name={option.value.name} />;
    case 'select':
      return <Select name={option.value.name} options={[]} />;
  }
};

export default InputSwitch;
