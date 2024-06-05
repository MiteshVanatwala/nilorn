import { Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { STEP } from '../../../app/utils/constant';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  onChange: (value: number) => void;
  value: number | undefined;
  min?: number;
  max?: number;
};

const PriceGridInput = ({ value, onChange, min, max }: Props) => {
  const { t } = useTranslation();

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(!value ? undefined : value);
  }, [value]);

  const onBlur = () => {
    if (!value) {
      setCurrentValue(0);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (!targetValue?.length) {
      setCurrentValue(undefined);
      onChange(0);
    } else {
      const numValue = Number(targetValue);
      const minValue = min || 0;
      const maxValue = max || 0;
      let newValue = isNaN(numValue) ? 0 : parseFloat(targetValue);
      newValue = Math.max(newValue, minValue);
      if (!!maxValue) {
        newValue = Math.min(newValue, maxValue);
      }
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Input
      onChange={onInputChange}
      onBlur={onBlur}
      value={currentValue}
      max={max}
      min={min}
      type="number"
      step={STEP}
      variant={'outline'}
      my={SPACE.XXS}
      borderRadius={BORDER_RADIUS.XS}
      placeholder={t('Common.Placeholder')}
    />
  );
};

export default PriceGridInput;
