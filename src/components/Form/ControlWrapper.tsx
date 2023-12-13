import {
  FormControl,
  FormHelperText,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, get } from 'react-hook-form';
import COLORS from '../../theme/Constants/colors';
import { FormInputProps } from '../../app/types/types';
import { useValidationStyleInFormContext } from '../../app/hooks/useValidationStyle';
import { useTranslation } from 'react-i18next';
import FormLabelComponent from './FormLabelComponent';

interface Props
  extends Omit<FormInputProps, 'registerOptions' | 'defaultValue'> {
  children: ReactNode;
  errors?: Partial<
    FieldErrorsImpl<{
      [key: string]: any;
    }>
  >;
  zIndex?: string;
}

const ControlWrapper = ({
  name,
  id,
  label,
  description,
  required,
  inline,
  helperText,
  errors,
  children,
  zIndex,
  hideValidationStyle,
}: Props) => {
  const error = get(errors, name) as FieldError;
  const { t } = useTranslation();
  const { color } = useValidationStyleInFormContext(
    hideValidationStyle ? '' : name
  );

  return (
    <FormControl
      isInvalid={error ? true : false}
      sx={{
        position: 'relative',
      }}>
      <Stack
        id={id ? id : name}
        direction={inline ? 'row' : 'column'}
        spacing={0}>
        {label && (
          <FormLabelComponent
            required={required}
            name={name}
            label={label}
            error={error}
            color={color}
          />
        )}
        {description && <FormHelperText>{description}</FormHelperText>}
        <InputGroup isolation={'auto'} zIndex={zIndex} display={'block'}>
          {children}
        </InputGroup>
      </Stack>

      {helperText && (
        <FormHelperText>
          <>{helperText}</>
        </FormHelperText>
      )}
      {error?.type === 'required' && !hideValidationStyle && (
        <Text color={COLORS.ERROR}>{t(`Errors.Required`)}</Text>
      )}
    </FormControl>
  );
};

export default ControlWrapper;
