import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from '@chakra-ui/react';
import { FieldError, get, useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../app/types/types';
import { HTMLInputTypeAttribute } from 'react';
import ControlWrapper from './ControlWrapper';
import SIZES from '../../theme/Constants/sizes';
import { COLORS, SPACE } from '../../theme/Constants';

interface Props extends FormInputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  scrolledPast?: boolean;
  isDisabled?: boolean;
  fontWeight?: string;
  letterSpacing?: string;
}

const EditableInputField = ({
  name,
  label,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  scrolledPast,
  type = 'text',
  variant = 'standard',
  hideValidationStyle,
  isDisabled = false,
  fontWeight,
  letterSpacing,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name) as FieldError;

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}>
      <Editable
        defaultValue={defaultValue?.toString()}
        isDisabled={isDisabled}
        placeholder={placeholder + (registerOptions?.required ? ' *' : '')}>
        <EditablePreview
          py={'.45rem'}
          px={SPACE.XS}
          border={'2px solid white'}
          color={error ? COLORS.ERROR : ''}
          fontSize={scrolledPast ? SIZES.FONT.SM : SIZES.FONT.MD}
        />
        <Input
          fontSize={scrolledPast ? SIZES.FONT.SM : SIZES.FONT.MD}
          letterSpacing={letterSpacing}
          fontWeight={fontWeight}
          as={EditableInput}
          variant={variant}
          disabled={isDisabled}
          type={type}
          height={'auto'}
          {...register(name, registerOptions)}
        />
      </Editable>
    </ControlWrapper>
  );
};

export default EditableInputField;
