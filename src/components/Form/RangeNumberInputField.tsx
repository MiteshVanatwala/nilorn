import { Box, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ControlWrapper from './ControlWrapper';
import { READ_ONLY_OPACITY } from '../../app/utils/constant';

interface Props {
  name: string; // Form field name (base)
  label: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  focusOnMount?: boolean;
  disableEdit?: boolean;
}

const RangeNumberInputField = ({
  name,
  label,
  placeholder,
  readonly = false,
  required = false,
  focusOnMount = false,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    getValues,
    getFieldState,
    setFocus,
    formState: { errors },
  } = useFormContext();

  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const minVal = getValues(`${name}Min`);
    const maxVal = getValues(`${name}Max`);

    if (
      minVal !== undefined &&
      maxVal !== undefined &&
      minVal !== null &&
      maxVal !== null
    ) {
      setInputValue(minVal === maxVal ? `${minVal}` : `${minVal}-${maxVal}`);
    } else {
      setInputValue('');
    }
  }, [getValues, name]);

  const validateInput = (value: string) => {
    if (!value && required) {
      return t('Errors.Required');
    }

    if (!value) return true;

    const rangeRegex = /^\d+(-\d+)?$/;

    if (!rangeRegex.test(value)) {
      if (
        value.startsWith('-') ||
        value.endsWith('-') ||
        value.includes('--')
      ) {
        return t('Errors.MinValue', { min: 0 }); // Custom for -5, 5-, 5--10
      }
      return t('Errors.FormatMustBeXorXtoX');
    }

    const [minStr, maxStr] = value.split('-');
    const min = parseInt(minStr, 10);
    const max = maxStr ? parseInt(maxStr, 10) : min;

    if (min < 0 || max < 0) return t('Errors.MinValue', { min: 0 });
    if (maxStr && min > max) return t('Errors.FormatMustBeXorXtoX');

    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { invalid } = getFieldState(name);
    if (!invalid && value) {
      const [minStr, maxStr] = value.split('-');
      const min = parseInt(minStr, 10) || 0;
      const max = maxStr ? parseInt(maxStr, 10) : min;

      setValue(`${name}Min`, min, { shouldValidate: true });
      setValue(`${name}Max`, max, { shouldValidate: true });
    }
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
    setFocus(name);
  };

  const { onChange, onBlur, ref, ...rest } = register(name, {
    validate: validateInput,
  });

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={required}
      errors={errors}>
      <Box onFocus={handleFocus} position="relative">
        {!!inputValue.length && !isActive && (
          <Text
            w="100%"
            pb="0.9rem"
            position="absolute"
            top="0.7rem"
            left={0}
            zIndex={readonly ? 1 : 0}
            borderBottom="1px solid #e2e8f0"
            opacity={readonly ? READ_ONLY_OPACITY : ''}
            variant={readonly ? 'disabled' : ''}
            color="inherit">
            {inputValue}&nbsp;
          </Text>
        )}
        <Input
          id={name}
          type="text"
          isReadOnly={readonly || disableEdit}
          placeholder={placeholder}
          textColor={!isActive && inputValue ? 'transparent' : 'inherit'}
          value={inputValue}
          autoComplete="off"
          onChange={e => {
            setInputValue(e.target.value);
            onChange(e); // Use the extracted onChange
          }}
          onBlur={e => {
            handleBlur(e);
            onBlur(e); // Use the extracted onBlur
          }}
          ref={ref}
          {...rest}
        />
      </Box>
    </ControlWrapper>
  );
};

export default RangeNumberInputField;
