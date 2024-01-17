import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { forwardRef } from 'react';
import ResizeTextarea from 'react-textarea-autosize';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: string | number | undefined | null;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  isDisabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({
    name,
    label,
    placeholder,
    registerOptions,
    helperText,
    defaultValue,
    variant = 'standard',
    hideValidationStyle,
    isDisabled = false,
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
          paddingTop={'.9rem'}
          paddingBottom={'.8rem'}
          lineHeight={1.5}
          resize="none"
          as={ResizeTextarea}
          variant={variant}
          disabled={isDisabled}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder}
          height={'auto'}
          {...register(name, registerOptions)}
        />
      </ControlWrapper>
    );
  }
);

export default TextArea;
