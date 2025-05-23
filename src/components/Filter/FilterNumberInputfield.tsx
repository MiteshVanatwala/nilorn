import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { isNumeric, numToThousandSeparatedsStr } from '../../app/utils/common';
import { COLORS } from '../../theme/Constants';
import ControlWrapper from '../Form/ControlWrapper';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  type: 'integer' | 'decimal';
}

const ALLOWED_KEYS = [
  'Tab',
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
  'Delete',
  'Home',
  'End',
];

const FilterNumberInputField = ({ name, label, placeholder, type }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const watch = useWatch({ name });

  const { setFocus, setValue, register } = useFormContext();

  useEffect(() => {
    setFocus(name);
  }, [setFocus, name]);

  const onBlur = () => {
    setIsActive(false);
  };

  const onBoxFocus = () => {
    setIsActive(true);
    setFocus(name);
  };

  const onInputFocus = () => {
    setIsActive(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (ALLOWED_KEYS.includes(e.key)) return;

    if (type === 'integer') {
      if (!isNumeric(e.key)) {
        e.preventDefault();
      }
    } else if (type === 'decimal') {
      if (!isNumeric(e.key) && e.key !== '.' && e.key !== ',') {
        e.preventDefault();
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (type === 'decimal') {
      value = value.replace(',', '.');
    }

    setValue(name, value);
  };

  const formattedValue = numToThousandSeparatedsStr(watch, true);
  const showFormattedValue = !!formattedValue && !isActive;

  return (
    <ControlWrapper name={name} label={label} hideValidationStyle>
      <Box onFocus={onBoxFocus} position={'relative'}>
        <Input
          color={showFormattedValue ? 'transparent' : undefined}
          variant={'filled'}
          placeholder={placeholder}
          type={'text'}
          cursor={'text'}
          onFocus={onInputFocus}
          onKeyDown={handleKeyDown}
          {...register(name, { onBlur })}
          onChange={onChange}
        />
        {showFormattedValue && (
          <Text
            position={'absolute'}
            top={'0.8rem'}
            left={'0.9rem'}
            bg={COLORS.GRAY[10]}
            pointerEvents={'none'}>
            {formattedValue}
          </Text>
        )}
      </Box>
    </ControlWrapper>
  );
};

export default FilterNumberInputField;
