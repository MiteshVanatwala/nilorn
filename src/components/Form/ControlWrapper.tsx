import {
  FormControl,
  FormHelperText,
  HStack,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  ValidationRule,
  get,
} from 'react-hook-form';
import COLORS from '../../theme/Constants/colors';
import { FormInputProps } from '../../app/types/types';
import { useValidationStyleInFormContext } from '../../app/hooks/useValidationStyle';
import { useTranslation } from 'react-i18next';
import FormLabelComponent from './FormLabelComponent';
import ChangelogPopup from '../Changelog/ChangelogPopup';
import fontSizes from '../../theme/fontSizes';

interface Props
  extends Omit<FormInputProps, 'registerOptions' | 'defaultValue'> {
  children: ReactNode;
  maxLength?: ValidationRule<number>;
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
  changelog,
  maxLength,
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
        <HStack justifyContent={label ? 'space-between' : 'flex-end'}>
          {label && (
            <FormLabelComponent
              required={required}
              name={name}
              label={label}
              error={error}
              color={color}
            />
          )}
          {changelog && <ChangelogPopup data={changelog} />}
        </HStack>
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
      {!hideValidationStyle && (
        <Text fontSize={fontSizes.xs} color={COLORS.ERROR}>
          {error?.message
            ? error.message
            : error?.type === 'required'
            ? t('Errors.Required')
            : error?.type === 'maxLength' && maxLength && !hideValidationStyle
            ? t('PD.Feedback.Error.FieldLength', {
                length: maxLength,
              })
            : null}
        </Text>
      )}
    </FormControl>
  );
};

export default ControlWrapper;
