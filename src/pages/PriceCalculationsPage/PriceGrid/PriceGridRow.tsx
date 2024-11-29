import { Button, GridItem, HStack, Link, VStack } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';
import { usePatchCalculationSalesPrice } from '../../../app/api/calculation';
import QueryKeysEnum from '../../../app/api/queryKeys';
import {
  PriceCalculationDto,
  PriceDto,
  ProductDevelopmentDataDto,
  ProductionDto,
  PurchasePriceDto,
  SalesPriceDto,
  SourcedProductionDto,
  UpdateSalesPriceCommand,
} from '../../../app/generate';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { useFormStateFilters } from '../../../app/utils/FilterHelper';
import { numToThousandSeparatedsStr } from '../../../app/utils/common';
import CommentPopup from '../../../components/CommentPopup/CommentPopup';
import {
  GridInlineTbody,
  GridTd,
} from '../../../components/GridTable/GridTableElements';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { SPACE } from '../../../theme/Constants';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
  PRICE_ROW_SPAN,
  VENDOR_ROW_SPAN,
} from '../PriceCalculationsTable';
import BaseValues from './BaseValues';
import SalesPriceCalculationForm from './SalesPriceCalculationForm';
import TableMenuCalculation from './TableMenuCalculation';
import { isClosed } from '../../../app/utils/status';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentDataDto;
  production: ProductionDto;
  tableMenu?: JSX.Element;
};

type ExtendedPriceDto = PriceDto & {
  isValidInput?: boolean;
};

function PriceGridRow({
  production,
  productDevelopment,
  sourcedProduction,
}: Props) {
  const { t } = useTranslation();
  const { mutate: saveSalesPrices } = usePatchCalculationSalesPrice();
  const vendorOptions = useFilterOptions('vendors');
  const filters = useFormStateFilters();
  const queryClient = useQueryClient();
  const isPDClosed =
    productDevelopment?.status && isClosed(productDevelopment?.status);
  // In phase one, only one calc!
  const [calculation, setCalculation] = useState<
    PriceCalculationDto | undefined
  >(
    production?.priceCalculations?.length
      ? production?.priceCalculations[0]
      : undefined
  );

  const [createNew, setCreateNew] = useState<boolean>(
    calculation === undefined
  );

  const [formData, setFormData] = useState<ExtendedPriceDto[]>(
    (calculation?.priceDtos as PriceDto[])?.map(priceDto => ({
      ...priceDto,
      isValidInput: true,
    })) ?? []
  );

  useEffect(() => {
    if (
      production?.priceCalculations &&
      production?.priceCalculations?.length > 0
    ) {
      setCalculation(production?.priceCalculations[0]);
      setCreateNew(false);
      setFormData(
        production?.priceCalculations[0]?.priceDtos?.map(priceDto => ({
          ...priceDto,
          isValidInput: true,
        })) ?? []
      );
    } else {
      setCreateNew(true);
      setCalculation(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [production?.priceCalculations]);

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const openRowForInlineEdit = () => {
    if (!isPDClosed) {
      setEnableEdit(true);
    }
  };

  const closeRowForInlineEdit = () => {
    setEnableEdit(false);
    setFormData((calculation?.priceDtos as PriceDto[]) ?? []);
  };

  const submitForm = () => {
    if (formData.every(price => price.isValidInput)) {
      const body: UpdateSalesPriceCommand = {
        salesPrices: formData as SalesPriceDto[],
      };
      saveSalesPrices(body, {
        onSuccess: async () => {
          setEnableEdit(false);
          queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
        },
      });
    }
  };

  const onInlineChange = (
    isValid: boolean,
    newMargin: number,
    newSalesPrice: number,
    salesPriceId: string
  ) => {
    const newData = [...formData];
    const index = newData.findIndex(item => item.salesPriceId === salesPriceId);
    if (index !== -1) {
      newData[index] = {
        ...newData[index],
        margin: newMargin,
        salesPrice: newSalesPrice,
        isValidInput: isValid,
      };
      setFormData(newData);
    } else {
      console.error(`Object with given ${salesPriceId} not found.`);
    }
  };

  return (
    <GridItem colSpan={VENDOR_ROW_SPAN}>
      <GridInlineTbody
        gridTemplateColumns={{
          base: GRID_LAYOUT_PRICE,
          lg: GRID_LAYOUT_PRICE_DESKTOP,
        }}>
        <GridTd>
          <>
            <VStack alignItems={'start'} spacing={SPACE.XXS} pb={SPACE.XXS}>
              <HStack justify={'space-between'} w={'100%'}>
                <VStack align={'start'} gap={SPACE.XXS}>
                  <Link
                    variant={'textLink'}
                    as={NavLink}
                    to={`/productions?vendors=${
                      vendorOptions.find(
                        option => option.label === production.vendorName
                      )?.value
                    }&productDevelopments=${productDevelopment?.no}`}>
                    {production.vendorName}
                  </Link>
                </VStack>
                <>
                  {production.released && (
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
                      filters={filters}
                    />
                  )}
                </>
              </HStack>
              {enableEdit && (
                <>
                  <Button
                    onClick={submitForm}
                    variant={'primarySmall'}
                    rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}>
                    {t('Common.Save')}
                  </Button>
                  <Button
                    onClick={closeRowForInlineEdit}
                    variant={'secondarySmall'}
                    rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}>
                    {t('Common.Cancel')}
                  </Button>
                </>
              )}
            </VStack>
          </>
        </GridTd>
        <GridTd>
          <CommentPopup comment={production.comment} />
        </GridTd>
        {(calculation && calculation?.priceDtos?.length) ||
        production.released ? (
          <>
            <GridTd gridColumn={'BaseValues'}>
              <BaseValues calculation={calculation} />
            </GridTd>
            <GridItem colSpan={2}>
              <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
                <>
                  {!!calculation ? (
                    <>
                      {calculation.priceDtos
                        ?.sort(
                          (a: PurchasePriceDto, b: PurchasePriceDto) =>
                            (a.quantity || 0) - (b.quantity || 0)
                        )
                        .map((pc, i) => (
                          <Fragment
                            key={
                              calculation?.productionId + '-purchasePrice-' + i
                            }>
                            <GridTd>
                              {numToThousandSeparatedsStr(pc.quantity)}
                            </GridTd>
                            <GridTd>
                              {numToThousandSeparatedsStr(pc.purchasePrice)}
                            </GridTd>
                          </Fragment>
                        ))}
                    </>
                  ) : (
                    <>
                      {production.purchasePrices
                        ?.sort(
                          (a: PurchasePriceDto, b: PurchasePriceDto) =>
                            (a.quantity || 0) - (b.quantity || 0)
                        )
                        .map((pp, i) => (
                          <Fragment
                            key={production?.id + '-purchasePrice-' + i}>
                            <GridTd>
                              {numToThousandSeparatedsStr(pp.quantity)}
                            </GridTd>
                            <GridTd>
                              {numToThousandSeparatedsStr(pp.price)}
                            </GridTd>
                          </Fragment>
                        ))}
                    </>
                  )}
                </>
              </GridInlineTbody>
            </GridItem>
            <GridTd>{production.currencyCode}</GridTd>
            <GridTd>{calculation?.currency?.code}</GridTd>
            <GridItem
              colSpan={PRICE_ROW_SPAN}
              onClick={createNew ? undefined : openRowForInlineEdit}>
              <GridInlineTbody
                gridTemplateColumns={`repeat(${PRICE_ROW_SPAN}, 1fr)`}>
                {!!calculation ? (
                  <SalesPriceCalculationForm
                    priceData={formData}
                    onCalculationChange={onInlineChange}
                    enableEdit={enableEdit}
                    calculation={calculation}
                    disableEdit={isPDClosed}
                  />
                ) : (
                  <GridTd colSpan={PRICE_ROW_SPAN}></GridTd>
                )}
              </GridInlineTbody>
            </GridItem>
          </>
        ) : (
          <>{production.released ? <></> : <GridTd colSpan={9}></GridTd>}</>
        )}
      </GridInlineTbody>
    </GridItem>
  );
}
export default PriceGridRow;
