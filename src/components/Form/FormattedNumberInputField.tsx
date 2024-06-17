import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { numToThousandSeparatedsStr } from '../../app/utils/common';
import { useTranslation } from 'react-i18next';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: number;
  variant?: 'standard';
  readonly?: boolean;
  type?: 'integer' | 'decimal';
  focusOnMount?: boolean;
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
  required?: boolean;
  validateNumber?: (value: number) => string | true;
}

const FormattedNumberInputField = ({
  name,
  label,
  placeholder,
  helperText,
  defaultValue,
  variant = 'standard',
  hideValidationStyle,
  changelog,
  readonly = false,
  type = 'decimal',
  focusOnMount = false,
  min,
  minMessage,
  max,
  maxMessage,
  required = false,
  validateNumber,
}: Props) => {
  const { t } = useTranslation();
  const {
    register,
    setValue: setFormValue,
    setFocus,
    getFieldState,
    formState: { errors },
  } = useFormContext();

  const [isActive, setIsActive] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const watch = useWatch({ name: name });

  useEffect(() => {
    focusOnMount && setFocus(name);
  }, [setFocus, name, focusOnMount]);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setFormattedValue(
        numToThousandSeparatedsStr(defaultValue, type === 'decimal')
      );
    }
  }, [defaultValue, name, type]);

  useEffect(() => {
    if (isNaN(watch)) {
      setFormattedValue('');
    } else if (!!watch) {
      setFormattedValue(
        numToThousandSeparatedsStr(watch, type === 'decimal') ?? ''
      );
    }
  }, [watch, type]);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { invalid } = getFieldState(name);
    if (!invalid) {
      const targetValue = e.target.value;
      if (!targetValue && !required) {
        setFormValue(name, '');
        setFormattedValue('');
        setIsActive(false);
        return;
      }
      const newStrVal = targetValue.replace(',', '.');
      let value: number = 0;
      if (type === 'integer') {
        value = parseInt(newStrVal);
      } else {
        value = parseFloat(newStrVal);
      }
      setFormValue(name, value);
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const onBoxFocus = () => {
    setIsActive(true);
    setFocus(name);
  };

  const onInputFocus = () => {
    setIsActive(true);
  };

  const showFormattedValue = (!!formattedValue.length && !isActive) || readonly;

  const regOptions: RegisterOptions = {
    required: required,
    validate: (val: string | number) => {
      if (!val && required) {
        return t('Errors.Required');
      }
      let newNumVal: number;
      let newStrVal = '';
      if (typeof val === 'string') {
        if (val.includes(' ')) {
          return t('Errors.NotANumber');
        }
        newStrVal = val?.replace(',', '.') ?? '';
        newNumVal = Number(newStrVal);
      } else {
        newNumVal = val;
      }
      if (isNaN(newNumVal)) {
        return t('Errors.NotANumber');
      } else if (type === 'integer' && newStrVal.includes('.')) {
        return t('Errors.MustBeAnInteger');
      } else if (min !== undefined && newNumVal < min) {
        return minMessage;
      } else if (max !== undefined && newNumVal > max) {
        return maxMessage;
      }
      return validateNumber ? validateNumber(newNumVal) : true;
    },
    onBlur,
  };

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}
      changelog={changelog}>
      <Box onFocus={onBoxFocus} position={'relative'}>
        {showFormattedValue && (
          <Text
            w={'100%'}
            pb={'0.9rem'}
            position={'absolute'}
            top={'0.7rem'}
            left={0}
            borderBottom={`1px solid #e2e8f0`}>
            {formattedValue}
          </Text>
        )}
        <Input
          type={'text'}
          inputMode={'numeric'}
          opacity={showFormattedValue ? '0%' : '100%'}
          variant={variant}
          isReadOnly={readonly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          cursor={readonly ? 'default' : 'text'}
          onFocus={onInputFocus}
          {...register(name, regOptions)}
        />
      </Box>
    </ControlWrapper>
  );
};

export default FormattedNumberInputField;
