import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { useFormContext } from 'react-hook-form';
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
  type?: 'integer' | 'decimal';
  focusOnMount?: boolean;
}

const FormattedNumberInputField = ({
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
  type = 'decimal',
  focusOnMount = false,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [prevValue, setPrevValue] = useState('');

  const {
    register,
    setValue: setFormValue,
    getValues,
    setFocus,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    focusOnMount && setFocus(name);
  }, [setFocus, name, focusOnMount]);

  useEffect(() => {
    const getValue = getValues(name);
    const dVal = getValue ?? defaultValue;
    setFormattedValue(
      dVal ? numToThousandSeparatedsStr(dVal, type === 'decimal') : ''
    );
    setPrevValue(dVal ? dVal.toString() : '');
  }, [defaultValue, getValues, name, type]);

  const onChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    let dotNotatedValue = targetValue.replace(',', '.');
    if (dotNotatedValue[0] === '.') {
      dotNotatedValue = `0${dotNotatedValue}`;
    }
    if (!isNaN(parseFloat(dotNotatedValue))) {
      setPrevValue(dotNotatedValue);
    }
  };

  const onBlur = () => {
    if (!prevValue) {
      setFormValue(name, min);
      setFormattedValue(min ? `${min}` : '');
    } else {
      const parsedValue =
        type === 'decimal' ? parseFloat(prevValue) : parseInt(prevValue);
      setFormValue(name, parsedValue);
      setFormattedValue(
        numToThousandSeparatedsStr(parsedValue, type === 'decimal')
      );
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
            borderBottom={`1px solid #e2e8f0`}>
            {formattedValue}
          </Text>
        )}

        <Input
          type={isActive ? 'text' : 'number'}
          opacity={showFormattedValue ? '0%' : readonly ? '70%' : '100%'}
          variant={variant}
          isReadOnly={readonly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          max={max}
          min={min}
          step={type === 'decimal' ? STEP : 1}
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

export default FormattedNumberInputField;
