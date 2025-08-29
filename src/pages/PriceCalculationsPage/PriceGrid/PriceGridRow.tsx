import { Button, Checkbox, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { usePatchCalculationSalesPrice } from '../../../app/api/calculation';
import QueryKeysEnum from '../../../app/api/queryKeys';
import {
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
import { TD_STYLE } from '../../../theme/Constants/tableGrid';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
  PRICE_ROW_SPAN,
  SelectedPrices,
  SelectedProduction,
  VENDOR_ROW_SPAN,
} from '../PriceCalculationsTable';
import BaseValues from './BaseValues';
import SalesPriceCalculationForm from './SalesPriceCalculationForm';
import TableMenuCalculation from './TableMenuCalculation';
import { isClosed } from '../../../app/utils/status';
import useStoreFilterAndNavigate from '../../../app/hooks/useStoreFilterAndNavigate';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentDataDto;
  production: ProductionDto;
  tableMenu?: JSX.Element;
  selectedPrices: SelectedPrices;
  setSelectedPrices: React.Dispatch<React.SetStateAction<SelectedPrices>>;
  selectedProduction: SelectedProduction;
  setSelectedProduction: React.Dispatch<
    React.SetStateAction<SelectedProduction>
  >;
};

type ExtendedPriceDto = PriceDto & {
  isValidInput?: boolean;
};

function PriceGridRow({
  production,
  productDevelopment,
  sourcedProduction,
  selectedPrices,
  setSelectedPrices,
  selectedProduction,
  setSelectedProduction,
}: Props) {
  const { t } = useTranslation();
  const { mutate: saveSalesPrices } = usePatchCalculationSalesPrice();
  const vendorOptions = useFilterOptions('vendors');
  const filters = useFormStateFilters();
  const queryClient = useQueryClient();
  const isPDClosed =
    productDevelopment?.status && isClosed(productDevelopment?.status);
  const { storeFilterAndNavigate } = useStoreFilterAndNavigate();

  // Support multiple calculations - wrapped in useMemo to avoid dependency issues
  const calculations = useMemo(() => production?.priceCalculations || [], [production?.priceCalculations]);
  const hasCalculations = calculations.length > 0;

  const showCreateNew = !hasCalculations;

  const [formDataMap, setFormDataMap] = useState<{[calcId: string]: ExtendedPriceDto[]}>({});

  useEffect(() => {
    const newFormDataMap: {[calcId: string]: ExtendedPriceDto[]} = {};
    calculations.forEach(calc => {
      if (calc.id) {
        newFormDataMap[calc.id] = calc.priceDtos?.map(priceDto => ({
          ...priceDto,
          isValidInput: true,
        })) ?? [];
      }
    });
    setFormDataMap(newFormDataMap);
  }, [calculations]);

  const [enableEditMap, setEnableEditMap] = useState<{[calcId: string]: boolean}>({});
  
  const openRowForInlineEdit = (calcId: string) => {
    if (!isPDClosed) {
      setEnableEditMap(prev => ({ ...prev, [calcId]: true }));
    }
  };

  const closeRowForInlineEdit = (calcId: string) => {
    setEnableEditMap(prev => ({ ...prev, [calcId]: false }));
    const calc = calculations.find(c => c.id === calcId);
    if (calc && calc.id) {
      setFormDataMap(prev => ({
        ...prev,
        [calc.id!]: calc.priceDtos?.map(priceDto => ({
          ...priceDto,
          isValidInput: true,
        })) ?? []
      }));
    }
  };

  const submitForm = (calcId: string) => {
    const formData = formDataMap[calcId] || [];
    if (formData.every(price => price.isValidInput)) {
      const body: UpdateSalesPriceCommand = {
        salesPrices: formData as SalesPriceDto[],
      };
      saveSalesPrices(body, {
        onSuccess: async () => {
          setEnableEditMap(prev => ({ ...prev, [calcId]: false }));
          queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
        },
      });
    }
  };

  const onInlineChange = (
    calcId: string,
    isValid: boolean,
    newMargin: number,
    newSalesPrice: number,
    salesPriceId: string
  ) => {
    setFormDataMap(prev => {
      const formData = [...(prev[calcId] || [])];
      const index = formData.findIndex(item => item.salesPriceId === salesPriceId);
      if (index !== -1) {
        formData[index] = {
          ...formData[index],
          margin: newMargin,
          salesPrice: newSalesPrice,
          isValidInput: isValid,
        };
        return { ...prev, [calcId]: formData };
      } else {
        console.error(`Object with given ${salesPriceId} not found.`);
        return prev;
      }
    });
  };

  const navigateToProduction = () => {
    storeFilterAndNavigate(
      `/productions?vendors=${
        vendorOptions.find(option => option.label === production.vendorName)
          ?.value
      }&productDevelopments=${productDevelopment?.no}${
        isPDClosed
          ? `&statuses=${filters?.statuses || productDevelopment?.status}`
          : ''
      }`
    );
  };

  const toggleSelectedPriceCheckbox = (id: string) => {
    setSelectedPrices({
      ...selectedPrices,
      [`${id}`]: {
        ...selectedPrices[`${id}`],
        selected: !selectedPrices[`${id}`].selected,
        productDevelopmentNo: productDevelopment?.no || '',
      },
    });
  };

  const toggleSelectedProductionCheckbox = (id: string) => {
    setSelectedProduction({
      ...selectedProduction,
      [`${id}`]: {
        ...selectedProduction[`${id}`],
        selected: !selectedProduction[`${id}`].selected,
        client: productDevelopment?.clientName || '',
        productDevelopmentNo: productDevelopment?.no || '',
      },
    });
  };

  // Show create new row if no calculations exist
  if (showCreateNew) {
    return (
      <GridItem colSpan={VENDOR_ROW_SPAN}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_PRICE,
            lg: GRID_LAYOUT_PRICE_DESKTOP,
          }}>
          <GridTd>
            <VStack alignItems={'start'} spacing={SPACE.XXS} pb={SPACE.XXS}>
              <HStack justify={'space-between'} w={'100%'}>
                <Button variant={'textBtn'} onClick={navigateToProduction}>
                  {production.vendorName}
                </Button>
                {production.released && (
                  <TableMenuCalculation
                    sourcedProduction={sourcedProduction}
                    productDevelopment={productDevelopment}
                    onEditInline={() => {}}
                    lastModified={production?.lastModified ?? undefined}
                    artwork={productDevelopment?.artwork}
                    production={production}
                    calculation={undefined}
                    createNew={true}
                    filters={filters}
                  />
                )}
              </HStack>
            </VStack>
          </GridTd>
          <GridTd>
            <CommentPopup comment={production.comment} />
          </GridTd>
          <GridTd justifyContent={'center'}>
            <Checkbox
              key={production.id}
              isChecked={
                selectedProduction[`${production?.id}`]?.selected || false
              }
              onChange={() =>
                toggleSelectedProductionCheckbox(production?.id || '')
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  toggleSelectedProductionCheckbox(production?.id || '');
                }
              }}
            />
          </GridTd>
          {production.released ? (
            <>
              <GridTd gridColumn={'BaseValues'}></GridTd>
              <GridItem colSpan={2}>
                <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
                  {production.purchasePrices?.map((pp, i) => (
                    <Fragment key={production?.id + '-purchasePrice-' + i}>
                      <GridTd>
                        {numToThousandSeparatedsStr(pp.quantity)}
                      </GridTd>
                      <GridTd>
                        {numToThousandSeparatedsStr(pp.price)}
                      </GridTd>
                    </Fragment>
                  ))}
                </GridInlineTbody>
              </GridItem>
              <GridTd>{production.currencyCode}</GridTd>
              <GridTd></GridTd>
              <GridItem colSpan={PRICE_ROW_SPAN}>
                <GridTd colSpan={PRICE_ROW_SPAN}></GridTd>
              </GridItem>
            </>
          ) : (
            <GridTd colSpan={9}></GridTd>
          )}
        </GridInlineTbody>
      </GridItem>
    );
  }

  const validCalculations = calculations.filter(calc => calc.id);

  // Create flattened array of all grid elements
  const gridElements = [
    // Vendor column - spans all rows
    <GridTd key="vendor" style={{ ...TD_STYLE, gridRow: `1 / span ${validCalculations.length}` }}>
      <VStack alignItems={'start'} spacing={SPACE.XXS} pb={SPACE.XXS}>
        <HStack justify={'space-between'} w={'100%'}>
          <Button variant={'textBtn'} onClick={navigateToProduction}>
            {production.vendorName}
          </Button>
          {production.released && (
            <TableMenuCalculation
              sourcedProduction={sourcedProduction}
              productDevelopment={productDevelopment}
              onEditInline={() => {}}
              lastModified={production?.lastModified ?? undefined}
              artwork={productDevelopment?.artwork}
              production={production}
              calculation={undefined}
              createNew={true}
              filters={filters}
            />
          )}
        </HStack>
      </VStack>
    </GridTd>,

    // Comment column - spans all rows  
    <GridTd key="comment" style={{ ...TD_STYLE, gridRow: `1 / span ${validCalculations.length}` }}>
      <CommentPopup comment={production.comment} />
    </GridTd>,

    // All calculation elements flattened
    ...validCalculations.flatMap((calculation) => {
      const calcId = calculation.id!;
      const enableEdit = enableEditMap[calcId] || false;
      const formData = formDataMap[calcId] || [];
      
      return [
        // Checkbox column
        <GridTd key={`${calcId}-checkbox`} justifyContent={'center'}>
          <VStack alignItems={'center'} spacing={SPACE.XXS}>
            <Checkbox
              key={calculation.id}
              isChecked={
                selectedPrices[`${calculation?.id}`]?.selected || false
              }
              onChange={() =>
                toggleSelectedPriceCheckbox(calculation?.id || '')
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  toggleSelectedPriceCheckbox(calculation?.id || '');
                }
              }}
            />
            {enableEdit && (
              <>
                <Button
                  onClick={() => submitForm(calcId)}
                  variant={'primarySmall'}
                  rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}>
                  {t('Common.Save')}
                </Button>
                <Button
                  onClick={() => closeRowForInlineEdit(calcId)}
                  variant={'secondarySmall'}
                  rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}>
                  {t('Common.Cancel')}
                </Button>
              </>
            )}
          </VStack>
        </GridTd>,

        // Base Values column
        <GridTd key={`${calcId}-base`} gridColumn={'BaseValues'}>
          <BaseValues 
            calculation={calculation} 
            production={production}
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            onEditInline={() => openRowForInlineEdit(calcId)}
            filters={filters}
          />
        </GridTd>,

        // Qty/Net columns
        <GridItem key={`${calcId}-qtynet`} colSpan={2}>
          <GridInlineTbody gridTemplateColumns={`repeat(2, 1fr)`}>
            {calculation.priceDtos
              ?.sort(
                (a: PurchasePriceDto, b: PurchasePriceDto) =>
                  (a.quantity || 0) - (b.quantity || 0)
              )
              .map((pc: any, i: number) => (
                <Fragment
                  key={calculation?.productionId + '-purchasePrice-' + i}>
                  <GridTd>
                    {numToThousandSeparatedsStr(pc.quantity)}
                  </GridTd>
                  <GridTd>
                    {numToThousandSeparatedsStr(pc.purchasePrice)}
                  </GridTd>
                </Fragment>
              ))}
          </GridInlineTbody>
        </GridItem>,

        // Purchase Currency
        <GridTd key={`${calcId}-purchase-currency`}>{production.currencyCode}</GridTd>,
        
        // Sales Currency
        <GridTd key={`${calcId}-sales-currency`}>{calculation?.currency?.code}</GridTd>,

        // Sales Price columns
        <GridItem
          key={`${calcId}-prices`}
          colSpan={PRICE_ROW_SPAN}
          onClick={!enableEdit ? () => openRowForInlineEdit(calcId) : undefined}>
          <GridInlineTbody
            gridTemplateColumns={`repeat(${PRICE_ROW_SPAN}, 1fr)`}>
            <SalesPriceCalculationForm
              priceData={formData}
              onCalculationChange={(isValid, newMargin, newSalesPrice, id) => 
                onInlineChange(calcId, isValid, newMargin, newSalesPrice, id)
              }
              enableEdit={enableEdit}
              calculation={calculation}
              disableEdit={isPDClosed}
            />
          </GridInlineTbody>
        </GridItem>
      ];
    })
  ];

  return (
    <GridItem colSpan={VENDOR_ROW_SPAN}>
      <GridInlineTbody
        gridTemplateColumns={{
          base: GRID_LAYOUT_PRICE,
          lg: GRID_LAYOUT_PRICE_DESKTOP,
        }}>
        {gridElements}
      </GridInlineTbody>
    </GridItem>
  );
}
export default PriceGridRow;
