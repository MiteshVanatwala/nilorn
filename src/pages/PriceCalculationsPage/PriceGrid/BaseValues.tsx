import { List, ListItem } from '@chakra-ui/react';
import { PriceCalculationDto } from '../../../app/generate';
import { useTranslation } from 'react-i18next';

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
              {calculation.internalCommission}
            </ListItem>
          )}
        <ListItem>
          {t('PriceCalc.IndirectCost')} {calculation.indirectCost}
        </ListItem>
        {calculation.currencyRate && calculation.currencyRate !== 1 && (
          <ListItem>
            {t('PriceCalc.CurrencyRate')} {calculation.currencyRate}
          </ListItem>
        )}
        {calculation.freightIncluded && calculation.freightIncluded !== 0 && (
          <ListItem>
            {t('PriceCalc.FreightIncluded_short')}
            {calculation.freightIncluded}
          </ListItem>
        )}
      </List>
    );
  } else return <></>;
};

export default BaseValues;
