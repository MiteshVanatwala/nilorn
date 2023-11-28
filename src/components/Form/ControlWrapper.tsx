import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, get } from 'react-hook-form';
import COLORS from '../../theme/Constants/colors';
import { FormInputProps } from '../../app/types/types';
import { SPACE } from '../../theme/Constants';
import { useValidationStyleInFormContext } from '../../app/hooks/useValidationStyle';
import { useTranslation } from 'react-i18next';

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
          <FormLabel
            paddingBottom={SPACE.XXS}
            marginBottom={SPACE.XXS}
            whiteSpace={inline ? 'nowrap' : 'normal'}
            color={error ? COLORS.ERROR : color}
            opacity={label === '-' ? 0 : 100}
            mb="0"
            w={'auto'}
            htmlFor={name}>
            {label} {required && '*'}
          </FormLabel>
        )}
        {description && <FormHelperText>{description}</FormHelperText>}
        <InputGroup zIndex={zIndex} display={'block'}>
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
