import { Box, Button, GridItem, Text, VStack } from '@chakra-ui/react';
import { PriceCalculationDto, ProductionDto } from '../../app/generate';
import { CSSProperties, useState } from 'react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import { GridInlineTbody, GridTd } from '../GridTable/GridTableElements';
import { useTranslation } from 'react-i18next';

type Props = {
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

function PriceGridRow({ production, style = TD_STYLE, tableMenu }: Props) {
  const { t } = useTranslation();

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  // In phase one, only one calc!
  let calc: PriceCalculationDto | undefined =
    production?.priceCalculations && production?.priceCalculations?.length > 0
      ? production?.priceCalculations[0]
      : undefined;

  calc = {
    ...calc,
    priceDtos: [
      {
        quantity: 100,
        cost: 3.0,
        margin: 40,
        purchasePrice: 0.4,
        salesPrice: 13,
      },
      {
        quantity: 1000,
        cost: 2.0,
        margin: 30,
        purchasePrice: 0.4,
        salesPrice: 15,
      },
      {
        quantity: 1000,
        cost: 2.0,
        margin: 30,
        purchasePrice: 0.4,
        salesPrice: 15,
      },
      {
        quantity: 1000,
        cost: 2.0,
        margin: 30,
        purchasePrice: 0.4,
        salesPrice: 15,
      },
      {
        quantity: 1000,
        cost: 2.0,
        margin: 30,
        purchasePrice: 0.4,
        salesPrice: 15,
      },
    ],
  };
  return (
    <GridItem colSpan={10} onClick={() => setEnableEdit(!enableEdit)}>
      <GridInlineTbody numFr={10}>
        <GridTd style={style}>
          <>
            <VStack>
              <Box>
                <>
                  {production.vendorName}
                  {tableMenu}
                </>
              </Box>
              {enableEdit && (
                <>
                  <Button variant={'secondarySmall'}>{t('Common.Save')}</Button>
                  <Button variant={'primarySmall'}>{t('Common.Cancel')}</Button>
                </>
              )}
            </VStack>
          </>
        </GridTd>
        <GridTd style={style}>{production.comment}</GridTd>
        {calc ? (
          <>
            <GridTd style={style}>
              <VStack>
                {calc!.internalCommission && calc.internalCommission !== 0 && (
                  <Text>
                    {t('PriceCalc.InternalCommission_short')}
                    {calc.internalCommission}
                  </Text>
                )}
                <Text>
                  {t('PriceCalc.IndirectCost')} {calc.indirectCost}
                </Text>
                {calc.currencyRate && calc.currencyRate !== 1 && (
                  <Text>
                    {t('PriceCalc.CurrencyRate')} {calc.currencyRate}
                  </Text>
                )}
                {calc.freightIncluded && calc.freightIncluded !== 0 && (
                  <Text>
                    {t('PriceCalc.FreightIncluded_short')}{' '}
                    {calc.freightIncluded}
                  </Text>
                )}
              </VStack>
            </GridTd>
            <GridItem colSpan={2}>
              <GridInlineTbody numFr={2}>
                {calc.priceDtos?.map(pc => (
                  <>
                    <GridTd style={style}>{pc.quantity}</GridTd>
                    <GridTd style={style}>{pc.purchasePrice}</GridTd>
                  </>
                ))}
              </GridInlineTbody>
            </GridItem>
            <GridTd style={style}>{production.currencyCode}</GridTd>
            <GridTd style={style}>{calc.currencyCode}</GridTd>
            <GridItem colSpan={3}>
              <GridInlineTbody numFr={3}>
                {calc.priceDtos?.map(pc => (
                  <>
                    <GridTd style={style}>{pc.margin}</GridTd>
                    <GridTd style={style}>{pc.salesPrice}</GridTd>
                    <GridTd style={style}>{pc.cost}</GridTd>
                  </>
                ))}
              </GridInlineTbody>
            </GridItem>
          </>
        ) : (
          <GridTd style={style} colSpan={8}>
            <>Rest</>
          </GridTd>
        )}
      </GridInlineTbody>
    </GridItem>
  );
}

export default PriceGridRow;
