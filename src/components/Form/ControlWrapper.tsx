import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, get } from 'react-hook-form';
import COLORS from '../../theme/Constants/colors';
import { FormInputProps } from '../../app/types/types';
import { SPACE } from '../../theme/Constants';
import React from 'react';
// import { useValidationStyleInFormContext } from '../../app/hooks/useValidationStyle';

interface Props
  extends Omit<FormInputProps, 'registerOptions' | 'defaultValue'> {
  children: ReactNode;
  errors?: FieldError | undefined;
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
  hideValidationStyle,
  children,
}: Props) => {
  // const error = get(errors, name) as FieldError;
  const error = errors;
  // const { color, icon } = useValidationStyleInFormContext(
  //   hideValidationStyle ? '' : name
  // );
  return (
    <FormControl
      className="linnes"
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
            fontWeight={'300'}
            paddingBottom={SPACE.XXS}
            marginBottom={SPACE.XXS}
            whiteSpace={inline ? 'nowrap' : 'normal'}
            color={
              error ? COLORS.ERROR : ''
              // color
            }
            opacity={label === '-' ? 0 : 100}
            mb="0"
            w={'auto'}
            htmlFor={name}>
            {label} {required && '*'}
            {/* {icon} */}
          </FormLabel>
        )}

        {description && <FormHelperText>{description}</FormHelperText>}
        <InputGroup display={'block'}>{children}</InputGroup>
      </Stack>

      {helperText && (
        <FormHelperText>
          <>{helperText}</>
        </FormHelperText>
      )}
      {error?.message && (
        <FormErrorMessage color={COLORS.ERROR} position={'absolute'}>
          <>{error?.message}</>
        </FormErrorMessage>
      )}
      {error?.type === 'pattern' && (
        <FormErrorMessage color={COLORS.ERROR} position={'absolute'}>
          <>Enter a valid value</>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default ControlWrapper;
