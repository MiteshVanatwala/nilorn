import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { HTMLInputTypeAttribute } from 'react';
import ControlWrapper from './ControlWrapper';

interface Props extends FormInputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  isDisabled?: boolean;
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
  isDisabled = false,
  changelog,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}
      changelog={changelog}>
      <Input
        variant={variant}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        {...register(name, registerOptions)}
      />
    </ControlWrapper>
  );
};

export default InputField;
