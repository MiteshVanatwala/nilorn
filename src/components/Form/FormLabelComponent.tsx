import { FormLabel } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import COLORS from '../../theme/Constants/colors';
import { FormInputProps } from '../../app/types/types';

interface Props
  extends Omit<FormInputProps, 'registerOptions' | 'defaultValue'> {
  error?: FieldError;
  color?: string;
}

const FormLabelComponent = ({
  name,
  label,
  required,
  inline,
  error,
  color = COLORS.BLACK,
}: Props) => {
  return (
    <FormLabel
      paddingBottom={'.2rem'}
      whiteSpace={inline ? 'nowrap' : 'normal'}
      color={error ? COLORS.ERROR : color}
      opacity={label === '-' ? 0 : 100}
      mb="0"
      w={'auto'}
      htmlFor={name}>
      {label} {required && '*'}
    </FormLabel>
  );
};

export default FormLabelComponent;
