import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import ResizeTextarea from 'react-textarea-autosize';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: string | number | undefined | null;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  readonly?: boolean;
  validateOnChange?: boolean;
}

const TextArea = ({
  name,
  label,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  variant = 'standard',
  hideValidationStyle,
  readonly = false,
  validateOnChange = true,
}: Props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { onChange, ...rest } = register(name, registerOptions);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(name, value, { shouldValidate: validateOnChange });
  };

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      maxLength={registerOptions?.maxLength}
      hideValidationStyle={hideValidationStyle}>
      <Textarea
        opacity={readonly ? '70%' : ''}
        cursor={readonly ? 'default' : 'text'}
        paddingTop={'.9rem'}
        paddingBottom={'.8rem'}
        lineHeight={1.5}
        resize="none"
        as={ResizeTextarea}
        variant={variant}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        height={'auto'}
        readOnly={readonly}
        onChange={handleChange}
        {...rest}
      />
    </ControlWrapper>
  );
};

export default TextArea;
