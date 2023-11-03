import { Input } from '@chakra-ui/react';
import { FieldError, useFormContext } from 'react-hook-form';
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
}: Props) => {
  const { register, formState } = useFormContext();
  let error = formState.errors?.[name] as FieldError | undefined;

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={error}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}>
      <Input
        variant={variant}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        height={'auto'}
        {...register(name, registerOptions)}
      />
    </ControlWrapper>
  );
};

export default InputField;
