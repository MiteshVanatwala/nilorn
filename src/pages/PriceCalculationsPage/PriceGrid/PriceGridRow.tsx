import { Box, Button, GridItem, VStack } from '@chakra-ui/react';
import {
  PriceCalculationDto,
  PriceDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SalesPriceDto,
  SourcedProductionDto,
  UpdateSalesPriceCommand,
} from '../../../app/generate';
import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { TD_STYLE } from '../../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTd,
} from '../../../components/GridTable/GridTableElements';
import { useTranslation } from 'react-i18next';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
} from '../PriceCalculationsTable';
import BaseValues from './BaseValues';
import { SPACE } from '../../../theme/Constants';
import SalesPriceCalculationForm from './SalesPriceCalculationForm';
import TableMenuCalculation from './TableMenuCalculation';
import { isClosed } from '../../../app/utils/status';
import CommentPopup from '../../../components/CommentPopup/CommentPopup';
import { usePatchCalculationSalesPrice } from '../../../app/api/calculation';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentBriefDto;
  production: ProductionDto;
  style?: CSSProperties;
  tableMenu?: JSX.Element;
};
function PriceGridRow({
  production,
  style = TD_STYLE,
  productDevelopment,
  sourcedProduction,
}: Props) {
  const { t } = useTranslation();
  const { mutate: saveSalesPrices } = usePatchCalculationSalesPrice();

  // In phase one, only one calc!
  const [calculation, setCalculation] = useState<
    PriceCalculationDto | undefined
  >(
    production?.priceCalculations && production?.priceCalculations?.length > 0
      ? production?.priceCalculations[0]
      : undefined
  );

  const [createNew, setCreateNew] = useState<boolean>(
    calculation === undefined
  );

  const [formData, setFormData] = useState<PriceDto[]>(
    (calculation?.priceDtos as PriceDto[]) ?? []
  );

  useEffect(() => {
    if (
      production?.priceCalculations &&
      production?.priceCalculations?.length > 0
    ) {
      setCalculation(production?.priceCalculations[0]);
      setCreateNew(false);
      setFormData((calculation?.priceDtos as PriceDto[]) ?? []);
    } else {
      setCreateNew(true);
      setCalculation(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [production?.priceCalculations]);

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const openRowForInlineEdit = () => {
    setEnableEdit(true);
  };
  const closeRowForInlineEdit = () => {
    setEnableEdit(false);
    setFormData((calculation?.priceDtos as PriceDto[]) ?? []);
  };
  const submitForm = () => {
    const body: UpdateSalesPriceCommand = {
      salesPrices: formData as SalesPriceDto[],
    };
    saveSalesPrices(body);
    setEnableEdit(false);
  };

  return (
    <GridItem colSpan={10}>
      <GridInlineTbody
        gridTemplateColumns={{
          base: GRID_LAYOUT_PRICE,
          lg: GRID_LAYOUT_PRICE_DESKTOP,
        }}>
        <GridTd style={style}>
          <>
            <VStack alignItems={'start'} spacing={SPACE.XXS} pb={SPACE.XXS}>
              <Box>
                <>
                  {production.vendorName}
                  {productDevelopment?.status &&
                    !isClosed(productDevelopment?.status) &&
                    production?.released && (
                      <TableMenuCalculation
                        sourcedProduction={sourcedProduction}
                        productDevelopment={productDevelopment}
                        onEditInline={openRowForInlineEdit}
                        lastModified={production?.lastModified ?? undefined}
                        artwork={productDevelopment?.artwork}
                        production={production}
                        calculation={calculation}
                        createNew={
                          (production?.priceCalculations &&
                            production?.priceCalculations?.length <= 0) ??
                          true
                        }
                      />
                    )}
                </>
              </Box>
              {enableEdit && (
                <>
                  <Button
                    onClick={submitForm}
                    variant={'primarySmall'}
                    rightIcon={<i className="ri-check-line" />}>
                    {t('Common.Save')}
                  </Button>
                  <Button
                    onClick={closeRowForInlineEdit}
                    variant={'secondarySmall'}
                    rightIcon={<i className="ri-close-line" />}>
                    {t('Common.Cancel')}
                  </Button>
                </>
              )}
            </VStack>
          </>
        </GridTd>
        <GridTd style={style}>
          <CommentPopup comment={production.comment} />
        </GridTd>
        {(calculation && calculation?.priceDtos?.length) ||
        production.released ? (
          <>
            <GridTd style={style} gridColumn={'BaseValues'}>
              <BaseValues calculation={calculation} />
            </GridTd>
            <GridItem colSpan={2}>
              <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
                <>
                  {!!calculation ? (
                    <>
                      {calculation.priceDtos?.map((pc, i) => (
                        <Fragment
                          key={
                            calculation?.productionId + '-purchasePrice-' + i
                          }>
                          <GridTd style={style}>{pc.quantity}</GridTd>
                          <GridTd style={style}>{pc.purchasePrice}</GridTd>
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      {production.purchasePrices?.map((pp, i) => (
                        <Fragment key={production?.id + '-purchasePrice-' + i}>
                          <GridTd style={style}>{pp.quantity}</GridTd>
                          <GridTd style={style}>{pp.price}</GridTd>
                        </Fragment>
                      ))}
                    </>
                  )}
                </>
              </GridInlineTbody>
            </GridItem>
            <GridTd style={style}>{production.currencyCode}</GridTd>
            <GridTd style={style}>{calculation?.currencyCode}</GridTd>
            <GridItem
              colSpan={3}
              onClick={createNew ? undefined : openRowForInlineEdit}>
              {!!calculation && (
                <SalesPriceCalculationForm
                  priceData={formData}
                  onCalculationChange={(
                    newMargin: number,
                    newSalesPrice: number,
                    salesPriceId: string
                  ) => {
                    const newData = [...formData];
                    const index = newData.findIndex(
                      item => item.salesPriceId === salesPriceId
                    );
                    if (index !== -1) {
                      newData[index] = {
                        ...newData[index],
                        margin: newMargin,
                        salesPrice: newSalesPrice,
                      };
                      setFormData(newData);
                    } else {
                      console.error(
                        `Object with given ${salesPriceId} not found.`
                      );
                    }
                  }}
                  enableEdit={enableEdit}
                  calculation={calculation}
                  style={style}
                />
              )}
            </GridItem>
          </>
        ) : (
          <>
            {production.released ? (
              <></>
            ) : (
              <GridTd style={style} colSpan={8}></GridTd>
            )}
          </>
        )}
      </GridInlineTbody>
    </GridItem>
  );
}
export default PriceGridRow;
