import { Box, Button, GridItem, VStack } from '@chakra-ui/react';
import { PriceCalculationDto, ProductionDto } from '../../../app/generate';
import { CSSProperties, Fragment, useState } from 'react';
import { TD_STYLE } from '../../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTd,
} from '../../../components/GridTable/GridTableElements';
import { useTranslation } from 'react-i18next';
import { GRID_LAYOUT_PRICE } from '../PriceCalculationsTable';
import BaseValues from './BaseValues';

type Props = {
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};

function PriceGridRow({ production, style = TD_STYLE, tableMenu }: Props) {
  const { t } = useTranslation();

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  // In phase one, only one calc!
  let calculation: PriceCalculationDto | undefined =
    production?.priceCalculations && production?.priceCalculations?.length > 0
      ? production?.priceCalculations[0]
      : undefined;

  if (calculation) {
    // Mock until we get data.
    calculation = {
      ...calculation,
      priceDtos: [
        {
          quantity: 100,
          cost: 0.75,
          margin: 40,
          purchasePrice: 0.72,
          salesPrice: 0.044,
        },
        {
          quantity: 1000,
          cost: 0.75,
          margin: 30,
          purchasePrice: 0.72,
          salesPrice: 0.044,
        },
        {
          quantity: 10000,
          cost: 0.75,
          margin: 30,
          purchasePrice: 0.72,
          salesPrice: 0.044,
        },
        {
          quantity: 100000,
          cost: 0.75,
          margin: 30,
          purchasePrice: 0.72,
          salesPrice: 0.044,
        },
      ],
    };
  }

  return (
    <GridItem colSpan={10} onClick={() => setEnableEdit(!enableEdit)}>
      <GridInlineTbody gridTemplateColumns={GRID_LAYOUT_PRICE}>
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
        {calculation ? (
          <>
            <GridTd style={style} gridColumn={'BaseValues'}>
              <BaseValues calculation={calculation} />
            </GridTd>
            <GridItem colSpan={2}>
              <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
                {calculation.priceDtos?.map((pc, i) => (
                  <Fragment
                    key={calculation?.productionId + '-purchasePrice-' + i}>
                    <GridTd style={style}>{pc.quantity}</GridTd>
                    <GridTd style={style}>{pc.purchasePrice}</GridTd>
                  </Fragment>
                ))}
              </GridInlineTbody>
            </GridItem>
            <GridTd style={style}>{production.currencyCode}</GridTd>
            <GridTd style={style}>{calculation.currencyCode}</GridTd>
            <GridItem colSpan={3}>
              <GridInlineTbody gridTemplateColumns={`repeat(3, 1fr)`}>
                {calculation.priceDtos?.map((pc, i) => (
                  <Fragment
                    key={calculation?.productionId + '-salesPrice-' + i}>
                    <GridTd style={style}>{pc.margin}</GridTd>
                    <GridTd style={style}>{pc.salesPrice}</GridTd>
                    <GridTd style={style}>{pc.cost}</GridTd>
                  </Fragment>
                ))}
              </GridInlineTbody>
            </GridItem>
          </>
        ) : (
          <GridTd style={style} colSpan={8}></GridTd>
        )}
      </GridInlineTbody>
    </GridItem>
  );
}

export default PriceGridRow;
