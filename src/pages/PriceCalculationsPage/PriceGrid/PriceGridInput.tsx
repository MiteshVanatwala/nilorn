import { Input } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  onChange: (value: number, isValid: boolean) => void;
  value: number | undefined;
  min?: number;
  max?: number;
};

const PriceGridInput = ({ value, onChange, min, max }: Props) => {
  const { t } = useTranslation();
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [currentValue, setCurrentValue] = useState('');

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

  useEffect(() => {
    if (value !== undefined) {
      if (currentValue === 'NaN' || currentValue === '') {
        if (!isNaN(value)) {
          setCurrentValue(value.toString());
          setIsValidNumber(isNumInRange(value));
        }
      } else if (isNaN(Number(currentValue)) && !isNaN(value)) {
        setCurrentValue(value.toString());
        setIsValidNumber(isNumInRange(value));
      } else if (isNaN(Number(currentValue))) {
      } else {
        setIsValidNumber(!isNaN(value) && isNumInRange(value));
        setCurrentValue(value.toString());
      }
    } else {
      setCurrentValue('');
      setIsValidNumber(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const convertToNumber = (value: string) => {
    if (
      !value?.length ||
      value.includes(' ') ||
      value.includes('e') ||
      isNaN(Number(value))
    ) {
      return null;
    }
    return parseFloat(value);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let targetValue = e.target.value;
    targetValue = targetValue.replace(',', '.');

    setCurrentValue(targetValue);
    const numValue = convertToNumber(targetValue);

    if (numValue === null || isNaN(numValue) || targetValue === '') {
      setIsValidNumber(false);
      onChange(NaN, false);
    } else {
      setIsValidNumber(isNumInRange(numValue));
      onChange(numValue, isNumInRange(numValue));
    }
  };

  return (
    <Input
      type="text"
      inputMode={'numeric'}
      onChange={onInputChange}
      value={currentValue}
      variant={'outline'}
      isInvalid={!isValidNumber}
      my={SPACE.XXS}
      borderRadius={BORDER_RADIUS.XS}
      placeholder={t('Common.Placeholder')}
    />
  );
};

export default PriceGridInput;
