import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import ResizeTextarea from 'react-textarea-autosize';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: string | number | undefined | null;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  readonly?: boolean;
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
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        height={'auto'}
        readOnly={readonly}
        {...register(name, registerOptions)}
      />
    </ControlWrapper>
  );
};

export default TextArea;
