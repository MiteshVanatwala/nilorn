import { Box, Input, Text } from '@chakra-ui/react';
import { FormInputProps } from '../../app/types/types';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { STEP } from '../../app/utils/constant';
import { numToThousandSeparatedsStr } from '../../app/utils/common';
import { COLORS } from '../../theme/Constants';
import ControlWrapper from '../Form/ControlWrapper';

interface Props extends FormInputProps {
  placeholder?: string;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
}

const FilterNumberInputField = ({ name, label, placeholder }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const watch = useWatch({ name });

  const { setFocus, register } = useFormContext();

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

  const formattedValue = numToThousandSeparatedsStr(watch, true);
  const showFormattedValue = !!formattedValue && !isActive;

  return (
    <ControlWrapper name={name} label={label} hideValidationStyle>
      <Box onFocus={onBoxFocus} position={'relative'}>
        <Input
          color={showFormattedValue ? 'transparent' : undefined}
          variant={'filled'}
          placeholder={placeholder}
          step={STEP}
          type={'number'}
          cursor={'text'}
          onFocus={onInputFocus}
          {...register(name, { onBlur })}
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
