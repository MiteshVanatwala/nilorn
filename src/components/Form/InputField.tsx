import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { READ_ONLY_OPACITY } from '../../app/utils/constant';

interface Props extends FormInputProps {
  type?: 'text' | 'hidden';
  placeholder?: string;
  defaultValue?: string | number;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  readonly?: boolean;
  max?: number;
  min?: number;
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
  max,
  min,
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
        onFocusCapture={e => readonly && e.target.setSelectionRange(0, 0)}
        opacity={readonly ? READ_ONLY_OPACITY : ''}
        variant={variant}
        isReadOnly={readonly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        max={max}
        min={min}
        type={type}
        cursor={readonly ? 'default' : 'text'}
        {...register(name, registerOptions)}
      />
    </ControlWrapper>
  );
};

export default InputField;
