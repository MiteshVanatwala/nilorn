import { Input } from '@chakra-ui/react';
import { FieldError, ValidationRule, useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import fontSizes from '../../theme/fontSizes';
import ControlWrapper from './ControlWrapper';
import React, { useEffect } from 'react';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  isDisabled?: boolean;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
  controller?: {
    setValue(value: string): void;
    value: string;
  };
  onChange?(value: string): void;
}

const InputSearch = ({
  name,
  label,
  placeholder,
  registerOptions,
  helperText,
  required,
  variant = 'standard',
  hideValidationStyle,
  isDisabled = false,
  controller,
  pattern,
  onChange,
}: Props) => {
  const {
    setValue: setFormContextValue,
    formState,
    register: formContextRegister,
  } = useFormContext();
  let error = formState.errors?.[name] as FieldError | undefined;
  const controllerValue = controller?.value;

  useEffect(() => {
    setFormContextValue(name, controllerValue, {
      shouldDirty: true,
    });
  }, [controllerValue, setFormContextValue, name]);
  const { onChange: formContextRegOnChange, ...formContextRegRest } =
    formContextRegister(name, {
      required,
      pattern,
    });

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
        placeholder={placeholder}
        type={'search'}
        padding={SPACE.XS}
        height={'auto'}
        {...formContextRegRest}
        onChange={e => {
          error = undefined;
          formContextRegOnChange(e);
          onChange?.(e.target.value);
          controller?.setValue?.(e.target.value);
        }}
        bgColor={COLORS.GRAY[10]}
        fontSize={fontSizes.sm}
        maxWidth={SIZES.CONTAINER.SM}
        disabled={isDisabled}
        minWidth={'30rem'}
      />
    </ControlWrapper>
  );
};

export default InputSearch;
