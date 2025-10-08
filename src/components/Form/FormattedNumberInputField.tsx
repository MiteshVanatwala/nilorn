import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import ControlWrapper from './ControlWrapper';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { numToThousandSeparatedsStr } from '../../app/utils/common';
import { useTranslation } from 'react-i18next';
import { READ_ONLY_OPACITY } from '../../app/utils/constant';

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
  showErrorIcon?: boolean;
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
  showErrorIcon = false,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (watch === null || watch === undefined || isNaN(watch)) {
      setFormattedValue('');
    } else if (!!watch || watch === 0) {
      setFormattedValue(
        numToThousandSeparatedsStr(watch, type === 'decimal') ?? ''
      );
    }
  }, [watch, type]);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { invalid } = getFieldState(name);
    if (!invalid) {
      const targetValue = e.target.value;
      if (!targetValue?.length) {
        setFormValue(name, null);
        setFormattedValue('');
        setIsActive(false);
        return;
      }
      let value: number = 0;
      if (type === 'integer') {
        value = parseInt(targetValue);
      } else {
        value = parseFloat(targetValue);
      }
      setFormValue(name, value);
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (type === 'decimal') {
      value = value.replace(',', '.');
    }

    setFormValue(name, value, { shouldDirty: true });
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
    validate: (val: string | number | null | undefined) => {
      if (required) {
        if (val === null || val === undefined) {
          return t('Errors.Required');
        }
        if (typeof val === 'string' && !val?.length) {
          return t('Errors.Required');
        }
      }

      if (!required) {
        if (val === null || val === undefined) {
          return true;
        }
        if (typeof val === 'string' && !val?.length) {
          return true;
        }
      }

      if (typeof val === 'string' && val.includes(' ')) {
        return type === 'integer'
          ? t('Errors.MustBeAnInteger')
          : t('Errors.MustBeANumber');
      }

      let newNumVal = val as number;
      let newStrVal = '';
      if (typeof val === 'string') {
        newStrVal = val?.replace(',', '.') ?? '';
        newNumVal = Number(newStrVal);
      }
      if (isNaN(newNumVal)) {
        return type === 'integer'
          ? t('Errors.MustBeAnInteger')
          : t('Errors.MustBeANumber');
      } else if (type === 'integer' && newStrVal.includes('.')) {
        return t('Errors.MustBeAnInteger');
      } else if (min !== undefined && newNumVal < min) {
        return minMessage ? minMessage : `${t('Errors.MinToLow', { min })}`;
      } else if (max !== undefined && newNumVal > max) {
        return maxMessage;
      }
      return validateNumber ? validateNumber(newNumVal) : true;
    },
    onBlur,
    onChange,
  };

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={required}
      errors={errors}
      showErrorIcon={showErrorIcon}
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
            onClick={() => readonly && setFocus(name)}
            zIndex={readonly ? 1 : 0}
            borderBottom={`1px solid #e2e8f0`}
            opacity={readonly ? '0.45' : ''}
            variant={readonly ? 'disabled' : ''}
            color={'inherit'}>
            {formattedValue}&nbsp;
          </Text>
        )}
        <Input
          type={'text'}
          inputMode={'numeric'}
          textColor={showFormattedValue ? 'transparent' : 'inherit'}
          onFocusCapture={e => readonly && e.target.setSelectionRange(0, 0)}
          variant={variant}
          isReadOnly={readonly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          cursor={readonly ? 'default' : 'text'}
          onFocus={onInputFocus}
          autoComplete="off"
          disabled={readonly}
          opacity={showFormattedValue ? 0 : 1}
          {...register(name, regOptions)}
          style={{
            color: showFormattedValue ? 'transparent' : 'inherit'
          }}
        />
      </Box>
    </ControlWrapper>
  );
};

export default FormattedNumberInputField;
