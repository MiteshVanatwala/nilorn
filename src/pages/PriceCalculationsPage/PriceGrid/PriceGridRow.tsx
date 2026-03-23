import { Button, Checkbox, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
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
  VENDOR_ROW_SPAN,
} from '../PriceCalculationsTable';
import BaseValues from './BaseValues';
import SalesPriceCalculationForm from './SalesPriceCalculationForm';
import TableMenuCalculation from './TableMenuCalculation';
import { isClosed } from '../../../app/utils/status';
import useStoreFilterAndNavigate from '../../../app/hooks/useStoreFilterAndNavigate';
import { useGetVendors } from '../../../app/api/vendors';

type Props = {
  sourcedProduction: SourcedProductionDto;
  productDevelopment?: ProductDevelopmentDataDto;
  production: ProductionDto;
  tableMenu?: JSX.Element;
  selectedPriceIds: Set<string>;
  toggleSelectedPrice: (priceId: string) => void;
  isProductionSelected: boolean;
  toggleSelectedProduction: (productionId: string) => void;
  selectAllTrigger: number;
};

type ExtendedPriceDto = PriceDto & {
  isValidInput?: boolean;
};

function PriceGridRow({
  production,
  productDevelopment,
  sourcedProduction,
  selectedPriceIds,
  toggleSelectedPrice,
  isProductionSelected,
  toggleSelectedProduction,
  selectAllTrigger,
}: Props) {
  const { t } = useTranslation();
  const { mutate: saveSalesPrices } = usePatchCalculationSalesPrice();
  const filters = useFormStateFilters();
  const queryClient = useQueryClient();
  const isPDClosed =
    productDevelopment?.status && isClosed(productDevelopment?.status);
  const { storeFilterAndNavigate } = useStoreFilterAndNavigate();
  const { data: vendors } = useGetVendors();

  // Support multiple calculations - wrapped in useMemo to avoid dependency issues
  const calculations = useMemo(() => production?.priceCalculations || [], [production?.priceCalculations]);
  const hasCalculations = calculations.length > 0;

  const showCreateNew = !hasCalculations;

  // Internal state for checkbox states - completely independent
  const [internalProductionSelected, setInternalProductionSelected] = useState(isProductionSelected);
  const [internalPriceSelections, setInternalPriceSelections] = useState<{[key: string]: boolean}>(() => {
    const initial: {[key: string]: boolean} = {};
    calculations.forEach(calc => {
      if (calc.id) {
        initial[calc.id] = selectedPriceIds.has(calc.id);
      }
    });
    return initial;
  });

  // Only sync on data structure changes, not on every selection change
  const calculationIds = useMemo(() => calculations.map(c => c.id).join(','), [calculations]);
  
  useEffect(() => {
    // Reset when calculations change (new data loaded)
    const newSelections: {[key: string]: boolean} = {};
    calculations.forEach(calc => {
      if (calc.id) {
        newSelections[calc.id] = selectedPriceIds.has(calc.id);
      }
    });
    setInternalPriceSelections(newSelections);
    setInternalProductionSelected(isProductionSelected);
  }, [calculationIds]);

  // Optimized sync for select all operations
  useEffect(() => {
    if (selectAllTrigger > 0) {
      // Use requestAnimationFrame for deferred updates
      requestAnimationFrame(() => {
        const newSelections: {[key: string]: boolean} = {};
        calculations.forEach(calc => {
          if (calc.id) {
            newSelections[calc.id] = selectedPriceIds.has(calc.id);
          }
        });
        setInternalPriceSelections(newSelections);
        setInternalProductionSelected(isProductionSelected);
      });
    }
  }, [selectAllTrigger, selectedPriceIds, isProductionSelected, calculations]);
  useEffect(() => {
    if (selectAllTrigger > 0) {
      // Update internal state directly based on current parent state
      const newSelections: {[key: string]: boolean} = {};
      calculations.forEach(calc => {
        if (calc.id) {
          newSelections[calc.id] = selectedPriceIds.has(calc.id);
        }
      });
      setInternalPriceSelections(newSelections);
      setInternalProductionSelected(isProductionSelected);
    }
  }, [selectAllTrigger, selectedPriceIds, isProductionSelected, calculations]);

  // Batched update mechanism
  const pendingUpdatesRef = useRef<{prices: Set<string>, productions: Set<string>}>({ 
    prices: new Set(), 
    productions: new Set() 
  });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flushPendingUpdates = useCallback(() => {
    const pending = pendingUpdatesRef.current;
    
    // Apply all pending price updates
    pending.prices.forEach(priceId => toggleSelectedPrice(priceId));
    
    // Apply all pending production updates  
    pending.productions.forEach(productionId => toggleSelectedProduction(productionId));
    
    // Clear pending updates
    pendingUpdatesRef.current = { prices: new Set(), productions: new Set() };
  }, [toggleSelectedPrice, toggleSelectedProduction]);

  const [formDataMap, setFormDataMap] = useState<{[calcId: string]: ExtendedPriceDto[]}>({});
  const [enableEditMap, setEnableEditMap] = useState<{[calcId: string]: boolean}>({});
  
  // Use ref to track current edit states to avoid stale closure issues
  const enableEditMapRef = useRef(enableEditMap);
  useEffect(() => {
    enableEditMapRef.current = enableEditMap;
  }, [enableEditMap]);
  
  const closeRowForInlineEdit = useCallback((calcId: string) => {
    setEnableEditMap(prev => ({ ...prev, [calcId]: false }));
    // Always reset to server data when closing inline edit
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
  }, [calculations]);

  // Poll for modal events periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for calculations updated via modal
      const lastUpdatedCalculationId = queryClient.getQueryData(['lastUpdatedCalculation']) as string;
      if (lastUpdatedCalculationId && enableEditMapRef.current[lastUpdatedCalculationId]) {
        setEnableEditMap(prev => ({ ...prev, [lastUpdatedCalculationId]: false }));
        queryClient.setQueryData(['lastUpdatedCalculation'], null);
      }

      // Check for forced inline edit closure (when modal closes without changes)
      const forceCloseInlineEdit = queryClient.getQueryData(['forceCloseInlineEdit']) as string;
      if (forceCloseInlineEdit && enableEditMapRef.current[forceCloseInlineEdit]) {
        closeRowForInlineEdit(forceCloseInlineEdit);
        queryClient.setQueryData(['forceCloseInlineEdit'], null);
      }
    }, 100); // Poll every 100ms

    return () => clearInterval(interval);
  }, [queryClient, closeRowForInlineEdit]);

  useEffect(() => {
    // Check if a specific calculation was just updated via modal
    const lastUpdatedCalculationId = queryClient.getQueryData(['lastUpdatedCalculation']) as string;
    
    setFormDataMap(prevFormDataMap => {
      const newFormDataMap: {[calcId: string]: ExtendedPriceDto[]} = {};
      calculations.forEach(calc => {
        if (calc.id) {
          // If this calculation was just updated via modal, reset to server values
          if (calc.id === lastUpdatedCalculationId) {
            newFormDataMap[calc.id] = calc.priceDtos?.map(priceDto => ({
              ...priceDto,
              isValidInput: true,
            })) ?? [];
          }
          // Otherwise, preserve inline edits if the calculation is currently being edited
          else {
            const isCurrentlyEditing = enableEditMapRef.current[calc.id];
            if (isCurrentlyEditing && prevFormDataMap[calc.id]) {
              // Keep existing form data if currently editing to preserve user input
              newFormDataMap[calc.id] = prevFormDataMap[calc.id];
            } else {
              // Reset to server values for non-edited calculations
              newFormDataMap[calc.id] = calc.priceDtos?.map(priceDto => ({
                ...priceDto,
                isValidInput: true,
              })) ?? [];
            }
          }
        }
      });
      return newFormDataMap;
    });
    
    // Don't reset edit mode - preserve inline editing states when data updates
    // This solves the issue where other calculations' inline edit gets closed
    // when one calculation is saved or modal is saved
  }, [calculations, queryClient]);
  
  const openRowForInlineEdit = (calcId: string) => {
    if (!isPDClosed) {
      setEnableEditMap(prev => ({ ...prev, [calcId]: true }));
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
          // Only close edit mode for the specific calculation that was saved
          setEnableEditMap(prev => ({ ...prev, [calcId]: false }));
          
          // Don't invalidate immediately - let the UI show the saved values first
          // The data will be refreshed when needed (e.g., when modal is opened)
          setTimeout(() => {
            queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
          }, 100);
        },
        onError: () => {
          // On error, reset form data to server values
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
        }
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
        vendors?.find(vendor => vendor.id === production?.vendorId)?.no
      }&productDevelopments=${productDevelopment?.no}${
        isPDClosed
          ? `&statuses=${filters?.statuses || productDevelopment?.status}`
          : ''
      }`
    );
  };

  const toggleSelectedPriceCheckbox = useCallback((id: string) => {
    // Update internal state immediately for instant UI response
    setInternalPriceSelections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Add to pending updates
    pendingUpdatesRef.current.prices.add(id);
    
    // Cancel previous timeout and set new one for batching
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(flushPendingUpdates, 16); // ~60fps
  }, [flushPendingUpdates]);

  const toggleSelectedProductionCheckbox = useCallback((id: string) => {
    // Update internal state immediately for instant UI response
    setInternalProductionSelected(prev => !prev);
    
    // Add to pending updates
    pendingUpdatesRef.current.productions.add(id);
    
    // Cancel previous timeout and set new one for batching
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(flushPendingUpdates, 16); // ~60fps
  }, [flushPendingUpdates]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
        // Flush any remaining updates
        flushPendingUpdates();
      }
    };
  }, [flushPendingUpdates]);

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
              isChecked={internalProductionSelected}
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
              isChecked={internalPriceSelections[calculation?.id || ''] || false}
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
export default memo(PriceGridRow, (prevProps, nextProps) => {
  // Only re-render if production data or key functions change
  return (
    prevProps.production?.id === nextProps.production?.id &&
    prevProps.production?.priceCalculations === nextProps.production?.priceCalculations &&
    prevProps.isProductionSelected === nextProps.isProductionSelected &&
    prevProps.toggleSelectedPrice === nextProps.toggleSelectedPrice &&
    prevProps.toggleSelectedProduction === nextProps.toggleSelectedProduction &&
    prevProps.productDevelopment?.no === nextProps.productDevelopment?.no &&
    prevProps.selectAllTrigger === nextProps.selectAllTrigger
  );
});
