import { HStack, List, ListItem, VStack } from '@chakra-ui/react';
import { 
  PriceCalculationDto, 
  ProductDevelopmentDataDto, 
  ProductionDto,
  SourcedProductionDto,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter
} from '../../../app/generate';
import { useTranslation } from 'react-i18next';
import { numToThousandSeparatedsStr } from '../../../app/utils/common';
import TableMenuCalculation from './TableMenuCalculation';

type Props = {
  calculation?: PriceCalculationDto;
  production?: ProductionDto;
  productDevelopment?: ProductDevelopmentDataDto;
  sourcedProduction?: SourcedProductionDto;
  onEditInline?: () => void;
  filters?: ServerFilter;
};

const BaseValues = ({ 
  calculation, 
  production, 
  productDevelopment, 
  sourcedProduction, 
  onEditInline, 
  filters 
}: Props) => {
  const { t } = useTranslation();

  if (!!calculation) {
    return (
      <>
        <VStack align="stretch" spacing={2} style={{ minWidth: '110px' }}>
          <List>
            {calculation!.internalCommission &&
              calculation.internalCommission !== 0 && (
                <ListItem>
                  {t('PriceCalc.InternalCommission_short')}{' '}
                  {numToThousandSeparatedsStr(calculation.internalCommission)}
                </ListItem>
              )}
            <ListItem>
              {t('PriceCalc.IndirectCost_short')}{' '}
              {numToThousandSeparatedsStr(calculation.indirectCost)}
            </ListItem>
            {calculation.currencyRate && calculation.currencyRate !== 1 && (
              <ListItem>
                {t('PriceCalc.CurrencyRate_short')}{' '}
                {numToThousandSeparatedsStr(calculation.currencyRate)}
              </ListItem>
            )}
            {calculation.freightIncluded &&
              calculation.freightIncluded !== 0 && (
                <ListItem>
                  {t('PriceCalc.FreightIncluded_short')}{' '}
                  {numToThousandSeparatedsStr(calculation.freightIncluded)}
                </ListItem>
              )}
          </List>
        </VStack>
        {production &&
          productDevelopment &&
          sourcedProduction &&
          onEditInline &&
          filters && (
            <HStack justify="flex-end">
              <TableMenuCalculation
                sourcedProduction={sourcedProduction}
                productDevelopment={productDevelopment}
                onEditInline={onEditInline}
                lastModified={production?.lastModified ?? undefined}
                artwork={productDevelopment?.artwork}
                production={production}
                calculation={calculation}
                createNew={false}
                filters={filters}
              />
            </HStack>
          )}
      </>
    );
  } else return <></>;
};

export default BaseValues;
