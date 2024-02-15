import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import ControlWrapper from './ControlWrapper';

interface Props extends FormInputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  readonly?: boolean;
}

const InputField = ({
  name,
  label,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  type = 'text',
  variant = 'standard',
  hideValidationStyle,
  changelog,
  readonly = false,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'decimal') {
      const value = e.target.value;
      const updatedValue = value.replace(/,/g, '.');
      e.target.value = updatedValue;
    }
  };
  return (
    <ControlWrapper
      name={name}
      label={label}
      maxLength={registerOptions?.maxLength}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}
      changelog={changelog}>
      <Input
        opacity={readonly ? '70%' : ''}
        variant={variant}
        isReadOnly={readonly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        cursor={readonly ? 'default' : 'text'}
        {...register(name, registerOptions)}
        onChange={handleInputChange}
      />
    </ControlWrapper>
  );
};

export default InputField;
