import { Button, GridItem, Link, VStack, HStack } from '@chakra-ui/react';
import {
  PriceCalculationDto,
  PriceDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SalesPriceDto,
  SourcedProductionDto,
  UpdateSalesPriceCommand,
} from '../../../app/generate';
import { Fragment, useEffect, useState } from 'react';
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
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { NavLink } from 'react-router-dom';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentBriefDto;
  production: ProductionDto;
  tableMenu?: JSX.Element;
};
function PriceGridRow({
  production,
  productDevelopment,
  sourcedProduction,
}: Props) {
  const { t } = useTranslation();
  const { mutate: saveSalesPrices } = usePatchCalculationSalesPrice();
  const vendorOptions = useFilterOptions('vendor');

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
      setFormData(
        (production?.priceCalculations[0]?.priceDtos as PriceDto[]) ?? []
      );
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
    saveSalesPrices(body, {
      onSuccess: async () => {
        setEnableEdit(false);
      },
    });
  };

  const onInlineChange = (
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
      };
      setFormData(newData);
    } else {
      console.error(`Object with given ${salesPriceId} not found.`);
    }
  };

  return (
    <GridItem colSpan={10}>
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
                    as={NavLink}
                    to={`/productions?vendor=${
                      vendorOptions.find(
                        option => option.label === production.vendorName
                      )?.value
                    }`}>
                    {production.vendorName}
                  </Link>
                </VStack>
                <>
                  {productDevelopment?.status &&
                    !isClosed(productDevelopment.status) &&
                    production.released && (
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
              </HStack>
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
                      {calculation.priceDtos?.map((pc, i) => (
                        <Fragment
                          key={
                            calculation?.productionId + '-purchasePrice-' + i
                          }>
                          <GridTd>{pc.quantity}</GridTd>
                          <GridTd>{pc.purchasePrice}</GridTd>
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      {production.purchasePrices?.map((pp, i) => (
                        <Fragment key={production?.id + '-purchasePrice-' + i}>
                          <GridTd>{pp.quantity}</GridTd>
                          <GridTd>{pp.price}</GridTd>
                        </Fragment>
                      ))}
                    </>
                  )}
                </>
              </GridInlineTbody>
            </GridItem>
            <GridTd>{production.currencyCode}</GridTd>
            <GridTd>{calculation?.currencyCode}</GridTd>
            <GridItem
              colSpan={3}
              onClick={createNew ? undefined : openRowForInlineEdit}>
              <GridInlineTbody gridTemplateColumns={`repeat(3, 1fr)`}>
                {!!calculation ? (
                  <SalesPriceCalculationForm
                    priceData={formData}
                    onCalculationChange={onInlineChange}
                    enableEdit={enableEdit}
                    calculation={calculation}
                  />
                ) : (
                  <GridTd colSpan={3}></GridTd>
                )}
              </GridInlineTbody>
            </GridItem>
          </>
        ) : (
          <>{production.released ? <></> : <GridTd colSpan={8}></GridTd>}</>
        )}
      </GridInlineTbody>
    </GridItem>
  );
}
export default PriceGridRow;
