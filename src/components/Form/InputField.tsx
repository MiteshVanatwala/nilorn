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
        step={type === 'decimal' ? '0.000000000000000001' : ''}
        type={type === 'decimal' ? 'number' : type}
        cursor={readonly ? 'default' : 'text'}
        {...register(name, registerOptions)}
      />
    </ControlWrapper>
  );
};

export default InputField;
