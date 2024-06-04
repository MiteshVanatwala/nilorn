import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { STEP } from '../../app/utils/constant';
import { numToThousandSeparatedsStr } from '../../app/utils/common';

interface Props extends FormInputProps {
  placeholder?: string;
  defaultValue?: number;
  variant?: 'standard';
  readonly?: boolean;
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
  type = 'decimal',
  focusOnMount = false,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const watch = useWatch({ name: name });

  const {
    register,
    setValue: setFormValue,
    setFocus,
    formState: { errors },
  } = useFormContext();

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
    if (watch === undefined) {
      setFormattedValue('');
    } else if (!!watch) {
      setFormattedValue(
        numToThousandSeparatedsStr(watch, type === 'decimal') ?? ''
      );
    }
  }, [watch, type]);

  const onBlur = (e: React.ChangeEvent<HTMLElement>) => {
    setIsActive(false);
    if (watch === undefined) {
      setFormValue(name, undefined);
    } else if (type === 'integer') {
      setFormValue(name, parseInt(watch));
    } else {
      setFormValue(name, parseFloat(watch));
    }
  };

  const onBoxFocus = () => {
    setIsActive(true);
    setFocus(name);
  };

  const onInputFocus = () => {
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
          type={'number'}
          opacity={readonly ? '70%' : showFormattedValue ? '0%' : '100%'}
          variant={variant}
          isReadOnly={readonly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          step={type === 'decimal' ? STEP : 1}
          cursor={readonly ? 'default' : 'text'}
          onFocus={onInputFocus}
          {...register(name, { ...registerOptions, onBlur })}
        />
      </Box>
    </ControlWrapper>
  );
};

export default FormattedNumberInputField;
