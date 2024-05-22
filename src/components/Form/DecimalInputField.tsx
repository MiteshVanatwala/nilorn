import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import {
  Controller,
  FieldError,
  ValidationRule,
  useFormContext,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { STEP } from '../../app/utils/constant';
import { numToThousandSeparatedsStr } from '../../app/utils/common';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: number;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  readonly?: boolean;
  max?: number;
  min?: number;
}

const DecimalInputField = ({
  name,
  label,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  variant = 'standard',
  hideValidationStyle,
  changelog,
  readonly = false,
  max,
  min,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [prevValue, setPrevValue] = useState('');

  const {
    register,
    setValue: setFormValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const getValue = getValues(name);
    const dVal = getValue ?? defaultValue;
    setFormattedValue(dVal ? numToThousandSeparatedsStr(dVal.toString()) : '');
    setPrevValue(dVal ? dVal.toString() : '');
  }, [defaultValue, getValues, name]);

  const onChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const nativeEvent = e.nativeEvent as InputEvent;
    const lastInput = nativeEvent.data;
    const [previInteger, prevDecimals] = prevValue.split('.');
    if (!targetValue) {
      if (!lastInput && !!prevDecimals) {
        setPrevValue(!!previInteger ? previInteger : '');
      } else if (lastInput === '.') {
        setPrevValue(!!previInteger ? previInteger : '');
      } else if (lastInput === ',') {
        setPrevValue(!!previInteger ? previInteger : '');
      }
    } else {
      setPrevValue(targetValue);
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!prevValue) {
      setFormValue(name, min);
      setFormattedValue('');
    } else {
      const parsedValue = parseFloat(prevValue);
      setFormValue(name, parsedValue);
      setFormattedValue(numToThousandSeparatedsStr(parsedValue));
    }
    setIsActive(false);
  };

  const onFocus = () => {
    setIsActive(true);
  };

  const showFormattedValue = !!formattedValue && !isActive;

  return (
    <ControlWrapper
      name={name}
      label={label}
      maxLength={registerOptions?.maxLength}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}
      changelog={changelog}>
      <Box onFocus={onFocus} position={'relative'}>
        {showFormattedValue && (
          <Text
            w={'100%'}
            pb={'0.9rem'}
            position={'absolute'}
            top={'0.7rem'}
            left={0}
            borderBottom={
              variant === 'standard' ? `1px solid #e2e8f0` : 'none'
            }>
            {formattedValue}
          </Text>
        )}

        <Input
          type={'number'}
          opacity={showFormattedValue ? '0%' : readonly ? '70%' : '100%'}
          color={
            showFormattedValue && variant === 'filled'
              ? 'transparent'
              : 'inherit'
          }
          variant={variant}
          isReadOnly={readonly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          max={max}
          min={min}
          step={STEP}
          onChangeCapture={onChangeCapture}
          cursor={readonly ? 'default' : 'text'}
          {...register(name, {
            ...registerOptions,
            onBlur,
          })}
        />
      </Box>
    </ControlWrapper>
  );
};

export default DecimalInputField;
