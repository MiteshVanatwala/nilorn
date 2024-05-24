import { List, ListItem } from '@chakra-ui/react';
import { PriceCalculationDto } from '../../../app/generate';
import { useTranslation } from 'react-i18next';
import { numToThousandSeparatedsStr } from '../../../app/utils/common';

type Props = {
  calculation?: PriceCalculationDto;
};

const BaseValues = ({ calculation }: Props) => {
  const { t } = useTranslation();

  if (!!calculation) {
    return (
      <List>
        {calculation!.internalCommission &&
          calculation.internalCommission !== 0 && (
            <ListItem>
              {t('PriceCalc.InternalCommission_short')}
              {numToThousandSeparatedsStr(calculation.internalCommission)}
            </ListItem>
          )}
        <ListItem>
          {t('PriceCalc.IndirectCost')}{' '}
          {numToThousandSeparatedsStr(calculation.indirectCost)}
        </ListItem>
        {calculation.currencyRate && calculation.currencyRate !== 1 && (
          <ListItem>
            {t('PriceCalc.CurrencyRate')}
            {numToThousandSeparatedsStr(calculation.currencyRate)}
          </ListItem>
        )}
        {calculation.freightIncluded && calculation.freightIncluded !== 0 && (
          <ListItem>
            {t('PriceCalc.FreightIncluded_short')}
            {numToThousandSeparatedsStr(calculation.freightIncluded)}
          </ListItem>
        )}
      </List>
    );
  } else return <></>;
};

export default BaseValues;
