import { FormInputProps } from '../../app/types/types';
import InputField from './InputField';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
}

const InputSearch = ({ name, label, placeholder, variant }: Props) => {
  return (
    <InputField
      label={label}
      variant={variant}
      type={'search'}
      placeholder={placeholder}
      name={name}
      registerOptions={{
        setValueAs(value) {
          return encodeURIComponent(value);
        },
      }}
    />
  );
};

export default InputSearch;
