import { Input } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { STEP } from '../../../app/utils/constant';
import { BORDER_RADIUS, COLORS, SPACE } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  onChange: (value: number) => void;
  value: number | undefined;
  min?: number;
  max?: number;
};

const PriceGridInput = ({ value, onChange, min, max }: Props) => {
  const { t } = useTranslation();
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isInRange, setIsInRange] = useState(true);
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value.toString());
      setIsInRange(isNumInRange(value));
      setIsValidNumber(convertToNumber(value.toString()) !== null);
    } else {
      setCurrentValue('');
      setIsValidNumber(false);
    }
  }, [value]);

  const convertToNumber = (value: string) => {
    const dotNotatedValue = value.replace(',', '.');
    if (
      !dotNotatedValue?.length ||
      dotNotatedValue.includes(' ') ||
      dotNotatedValue.includes('e') ||
      isNaN(Number(dotNotatedValue))
    ) {
      return null;
    }
    return parseFloat(dotNotatedValue);
  };

  const isNumInRange = useCallback(
    (num: number) => {
      if (min !== undefined && num < min) {
        return false;
      }
      if (max !== undefined && num > max) {
        return false;
      }
      return true;
    },
    [min, max]
  );

  const getNumInRange = useCallback(
    (num: number) => {
      if (min !== undefined && num < min) {
        return Math.max(num, min);
      }
      if (max !== undefined && num > max) {
        return Math.min(num, max);
      }
      return num;
    },
    [min, max]
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setCurrentValue(targetValue);
    const numValue = convertToNumber(targetValue);

    if (numValue === null) {
      setIsValidNumber(false);
    } else if (!isNumInRange(numValue)) {
      setIsInRange(false);
    } else {
      setIsValidNumber(true);
      setIsInRange(true);
      const lastChar = targetValue[targetValue.length - 1];
      if (lastChar !== ',' && lastChar !== '.') {
        onChange(numValue);
      }
    }
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (!isValidNumber) {
      onChange(0);
      setCurrentValue('0');
      setIsValidNumber(true);
    } else if (!isInRange) {
      const numInRange = getNumInRange(Number(targetValue));
      onChange(numInRange);
      setCurrentValue(numInRange.toString());
      setIsInRange(true);
    } else {
      const numValue = convertToNumber(targetValue);
      if (numValue !== null) {
        setCurrentValue(numValue.toString());
        onChange(numValue);
      }
    }
  };

  return (
    <Input
      type="text"
      inputMode={'numeric'}
      onChange={onInputChange}
      onBlur={onBlur}
      value={currentValue}
      variant={'outline'}
      isInvalid={!isValidNumber || !isInRange}
      my={SPACE.XXS}
      borderRadius={BORDER_RADIUS.XS}
      placeholder={t('Common.Placeholder')}
    />
  );
};

export default PriceGridInput;
