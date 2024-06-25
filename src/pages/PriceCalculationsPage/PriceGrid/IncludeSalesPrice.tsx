import { Box, Switch, Tooltip } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIncludeSalesPrice } from '../../../app/api/calculation';

type Props = {
  salesPriceId: string;
  valid: boolean;
  included: boolean;
  disableEdit?: boolean;
};
const IncludeSalesPrice = ({
  salesPriceId,
  valid,
  included,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();

  const [isIncluded, setIncluded] = useState<boolean>(valid ? included : false);
  const [isValid, setVaild] = useState<boolean>(valid);
  const { mutate } = useIncludeSalesPrice(salesPriceId, isValid);

  useEffect(() => {
    setVaild(valid);
    setIncluded(included);
  }, [valid, included]);

  const tooltip = useMemo(() => {
    if (!isValid) {
      return t(`PriceCalc.Export.Invalid`);
    } else if (!isIncluded) {
      return t(`PriceCalc.Export.NotIncluded`);
    }
    return t(`PriceCalc.Export.Included`);
  }, [isIncluded, isValid, t]);

  const toggleInclude = () => {
    mutate(!isIncluded, {
      onSuccess: res => {
        setIncluded(res.included ?? false);
        setVaild(res.valid ?? false);
      },
    });
  };

  return (
    <Tooltip label={tooltip}>
      <Box>
        <Switch
          variant={isValid ? 'default' : 'invalid'}
          isChecked={isIncluded}
          onChange={toggleInclude}
          isReadOnly={disableEdit}
        />
      </Box>
    </Tooltip>
  );
};

export default IncludeSalesPrice;
