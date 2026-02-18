// PriceCalculationsTable.tsx
import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridTh,
  GridTable,
} from '../../components/GridTable/GridTableElements';
import PriceCalculationsTableRow from './PriceCalculationsTableRow';
import { Checkbox, Grid, GridItem, Text } from '@chakra-ui/react';
import PriceCalculationPageMenu from './PriceCalculationPageMenu';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import { COLORS, SPACE } from '../../theme/Constants';
import { TH_STYLE } from '../../theme/Constants/tableGrid';
import { useModal } from '../../app/hooks/useModal';
import ExcelExportModalContent from '../../components/ExcelExport/ExcelExportModalContent';
import CreatePriceCalculationModal from './CreatePriceCalculationModal';
import BulkCreatePriceCalculationModal from './BulkCreatePriceCalculationModal';
import EditPriceCalculationModal from './EditPriceCalculationModal';
import BulkEditPriceCalculationModal from './BulkEditPriceCalculationModal';
import { useFormStateFilters } from '../../app/utils/FilterHelper';
import { useBulkPriceCalculationsBatch, useBulkProductionsBatch } from '../../app/api/calculation';
import { isClosed } from '../../app/utils/status';

const GRID_LAYOUT =
  'repeat(4, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

export const GRID_LAYOUT_SOURCING =
  'repeat(1, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

export const GRID_LAYOUT_PRICE =
  '[Vendor] minmax(100px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

const GRID_LAYOUT_DESKTOP =
  'repeat(4, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const GRID_LAYOUT_SOURCING_DESKTOP =
  'repeat(1, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const GRID_LAYOUT_PRICE_DESKTOP =
  '[Vendor] minmax(150px, 1fr) [Comment] 1fr minmax(50px, 1fr) [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const PD_COL_SPAN = 2;
export const SOURCING_COL_SPAN = 1;

export const ROW_SPAN = 14;
export const VENDOR_ROW_SPAN = 12;
export const CALCULATION_ROW_SPAN = 9;
export const PRICE_ROW_SPAN = 4;

// Component to handle bulk edit with fresh data from API
const BulkEditWithFreshData = ({ 
  selectedPriceIds, 
  productionsData, 
  productDevelopmentsData 
}: { 
  selectedPriceIds: string[]; 
  productionsData: any[]; 
  productDevelopmentsData: any[]; 
}) => {
  const { data: freshCalculations } = useBulkPriceCalculationsBatch(selectedPriceIds);
  
  return (
    <BulkEditPriceCalculationModal
      calculations={freshCalculations ?? []}
      productions={productionsData}
      productDevelopments={productDevelopmentsData}
    />
  );
};

// Component to handle bulk create with fresh data from API
const BulkCreateWithFreshData = ({ 
  selectedProductionIds,
  selectedPriceIds,
  productionsData, 
  productDevelopmentsData,
  sourcedProductionsData
}: { 
  selectedProductionIds: string[];
  selectedPriceIds: string[];
  productionsData: any[]; 
  productDevelopmentsData: any[];
  sourcedProductionsData: any[];
}) => {
  const { isLoading: calculationsLoading } = useBulkPriceCalculationsBatch(selectedPriceIds);
  
  // Get all production IDs from productionsData (both selected productions and productions with selected prices)
  // Remove duplicates to avoid multiple API calls for the same production
  const allProductionIds = useMemo(() => 
    [...new Set(productionsData.map(prod => prod.id).filter(Boolean))], 
    [productionsData]
  );
  const { data: freshProductions, isLoading: productionsLoading } = useBulkProductionsBatch(allProductionIds);
  
  // if (calculationsLoading || productionsLoading) {
  //   return null; // or a loading component
  // }

  // Use fresh data if available, otherwise fall back to passed data
  // We need to maintain the original order and structure of productionsData
  const finalProductionsData = freshProductions ? 
    productionsData.map(prod => {
      const freshProd = freshProductions.find(fp => fp.id === prod.id);
      return freshProd || prod;
    }) : 
    productionsData;

  // For calculations, we need to maintain the same count as productions
  // Each production should have one calculation entry (either existing or undefined for new ones)
  const finalCalculationsData = finalProductionsData.map(prod => 
    prod.priceCalculations?.[0] || undefined
  );

  // Filter to remove duplicates based on production ID
  const seenProductionIds = new Set();
  const filteredProductionsData = finalProductionsData.filter(prod => {
    if (seenProductionIds.has(prod.id)) {
      return false;
    }
    seenProductionIds.add(prod.id);
    return true;
  });
  
  // Create calculations array that matches the filtered productions
  // Each production gets one calculation entry (existing or undefined for new ones)
  const filteredCalculationsData = filteredProductionsData.map(prod => 
    prod.priceCalculations?.[0] || undefined
  );
  
  // Decision logic: Show bulk modal if multiple productions, single modal if only one production
  // This ensures one price calculation per production is created correctly
  if (filteredProductionsData.length > 1) {
    return (
      <BulkCreatePriceCalculationModal
        isLoading={calculationsLoading || productionsLoading}
        production={filteredProductionsData}
        calculation={filteredCalculationsData}
      />
    );
  } else if (filteredProductionsData.length === 1) {
    return (
      <CreatePriceCalculationModal
        productDevelopment={productDevelopmentsData[0]}
        production={filteredProductionsData[0]}
        calculation={filteredCalculationsData[0]}
        sourcedProduction={sourcedProductionsData[0]}
        artwork={productDevelopmentsData[0]?.artwork}
        lastModified={filteredProductionsData[0].lastModified}
        filters={filteredProductionsData[0]?.filters}
      />
    );
  }
  
  return null;
};

export type SelectedPrices = {
  [key: string]: {
    selected: boolean;
    client: string;
    productDevelopmentNo: string;
  };
};

export type SelectedProduction = {
  [key: string]: {
    selected: boolean;
    client: string;
    productDevelopmentNo: string;
  };
};

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  const { isLoading } = useDownloadFile();
  const filters = useFormStateFilters();
  const [selectedPriceIds, setSelectedPriceIds] = useState<Set<string>>(new Set());
  const [priceMetadata, setPriceMetadata] = useState<{
    [key: string]: { client: string; productDevelopmentNo: string };
  }>({});
  const [selectedProductionIds, setSelectedProductionIds] = useState<Set<string>>(new Set());
  const [productionMetadata, setProductionMetadata] = useState<{
    [key: string]: { client: string; productDevelopmentNo: string };
  }>({});
  const [uniqueClients, setUniqueClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectAllIndeterminate, setSelectAllIndeterminate] =
    useState<boolean>(false);
  
  const selectedCheckboxes = useMemo(() => 
    selectedPriceIds.size + selectedProductionIds.size,
    [selectedPriceIds, selectedProductionIds]
  );

  // useEffect(() => {
  //   // Count selected prices
  //   const selectedPricesCount = Object.values(selectedPrices).filter(
  //     price => price.selected
  //   ).length;

  //   // Count selected productions
  //   const selectedProductionCount = selectedProductionIds.size;

  //   const totalSelectedCount = selectedPricesCount + selectedProductionCount;
  //   const totalItemsCount = Object.keys(selectedPrices).length + Object.keys(productionMetadata).length;

  //   if (totalSelectedCount > 0) {
  //     setSelectAll(totalItemsCount === totalSelectedCount);
  //     setSelectAllIndeterminate(totalItemsCount !== totalSelectedCount);
  //   } else {
  //     setSelectAll(false);
  //     setSelectAllIndeterminate(false);
  //   }
  //   getUniqueClients();
  // }, [selectedPrices, selectedProductionIds, productionMetadata]);

  // Stable callback functions to prevent re-renders - completely stable
  const toggleSelectedPriceRef = useRef<(priceId: string) => void>();
  const toggleSelectedProductionRef = useRef<(productionId: string) => void>();

  toggleSelectedPriceRef.current = (priceId: string) => {
    setSelectedPriceIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(priceId)) {
        newSet.delete(priceId);
      } else {
        newSet.add(priceId);
      }
      return newSet;
    });
  };

  toggleSelectedProductionRef.current = (productionId: string) => {
    setSelectedProductionIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productionId)) {
        newSet.delete(productionId);
      } else {
        newSet.add(productionId);
      }
      return newSet;
    });
  };

  const stableTogglePrice = useCallback((priceId: string) => {
    toggleSelectedPriceRef.current?.(priceId);
  }, []);

  const stableToggleProduction = useCallback((productionId: string) => {
    toggleSelectedProductionRef.current?.(productionId);
  }, []);

  useEffect(() => {
    let priceMeta: { [key: string]: { client: string; productDevelopmentNo: string } } = {};
    let productionMeta: { [key: string]: { client: string; productDevelopmentNo: string } } = {};
    
    data?.forEach(p => {
      p.sourcedProductions?.forEach(s => {
        s.productions?.forEach(production => {
          const priceCalculations = production.priceCalculations || [];
          
          // If production has price calculations, add the price calculations metadata
          if (priceCalculations.length > 0) {
            priceCalculations.forEach(priceCalculation => {
              if (priceCalculation?.id) {
                priceMeta[priceCalculation.id] = {
                  client: p.productDevelopmentDataDto?.clientName || '',
                  productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
                };
              }
            });
          } else {
            // If production has no price calculations, add the production metadata
            if (production.id) {
              productionMeta[production.id] = {
                client: p.productDevelopmentDataDto?.clientName || '',
                productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
              };
            }
          }
        });
      });
    });
    
    // Clear selections when data changes to avoid stale selections
    setSelectedPriceIds(new Set());
    setSelectedProductionIds(new Set());
    setPriceMetadata(priceMeta);
    setProductionMetadata(productionMeta);
  }, [data]);

  const getUniqueClients = () => {
    const priceClients = Array.from(selectedPriceIds)
      .map(id => priceMetadata[id]?.client)
      .filter(Boolean);
    
    const productionClients = Array.from(selectedProductionIds)
      .map(id => productionMetadata[id]?.client)
      .filter(Boolean);
    
    const allClients = [...priceClients, ...productionClients];
    setUniqueClients(allClients.filter((x, i, a) => a.indexOf(x) === i));
  };

  const handleExportClick = async () => {
    // Convert Set to SelectedPrices format for the modal
    const selectedPricesForExport: SelectedPrices = {};
    Array.from(selectedPriceIds).forEach(id => {
      const metadata = priceMetadata[id];
      if (metadata) {
        selectedPricesForExport[id] = {
          selected: true,
          ...metadata
        };
      }
    });
    handleModal(<ExcelExportModalContent selectedPrices={selectedPricesForExport} />);
  };

  const handleAddPriceCalculation = () => {
    // Get all selected production and price IDs
    const selectedProductionIdsArray = Array.from(selectedProductionIds);
    const selectedPriceIdsArray = Array.from(selectedPriceIds);

    // Arrays to store the calculation data (matching handleEditPriceCalculation pattern)
    const calculationsData: any[] = [];
    const productionsData: any[] = [];
    const productDevelopmentsData: any[] = [];
    const sourcedProductionsData: any[] = [];

    if (selectedProductionIdsArray.length > 0 || selectedPriceIdsArray.length > 0) {
      // Search through the data structure to find all matching productions and prices
      for (const pd of data) {
        for (const sp of pd.sourcedProductions || []) {
          // Handle selected productions
          const productions = sp.productions?.filter(
            p => p.id && selectedProductionIdsArray.includes(p.id)
          );

          if (productions && productions.length > 0) {
            productions.forEach(production => {
              productionsData.push(production);
              calculationsData.push(production.priceCalculations ?? undefined);
              productDevelopmentsData.push(pd.productDevelopmentDataDto);
              sourcedProductionsData.push(sp);
            });
          }

          // Handle selected prices
          sp.productions?.forEach(production => {
            const matchingPriceCalculations =
              production.priceCalculations?.filter(
                calc => calc.id && selectedPriceIdsArray.includes(calc.id)
              );

            if (
              matchingPriceCalculations &&
              matchingPriceCalculations.length > 0
            ) {
              // Push each matching price calculation individually to maintain flat structure
              matchingPriceCalculations.forEach(calc => {
                productionsData.push(production);
                calculationsData.push(calc);
                productDevelopmentsData.push(pd.productDevelopmentDataDto);
                sourcedProductionsData.push(sp);
              });
            }
          });
        }
      }

      // Use the bulk fetch component to get fresh data from backend
      handleModal(
        <BulkCreateWithFreshData
          selectedProductionIds={selectedProductionIdsArray}
          selectedPriceIds={selectedPriceIdsArray}
          productionsData={productionsData}
          productDevelopmentsData={productDevelopmentsData}
          sourcedProductionsData={sourcedProductionsData}
        />
      );
    }
  };

  const handleEditPriceCalculation = () => {
    // Get selected price calculation IDs
    const selectedPriceIdsArray = Array.from(selectedPriceIds);

    // Arrays to store the calculation data
    const calculationsData: any[] = [];
    const productionsData: any[] = [];
    const productDevelopmentsData: any[] = [];

    // Collect data for selected prices and productions
    for (const pd of data) {
      for (const sp of pd.sourcedProductions || []) {
        sp.productions?.forEach((production: any) => {
          // Check selected productions
          if (production?.id && selectedProductionIds.has(production.id)) {
            const calculation = production.priceCalculations;
            if (calculation) {
              calculationsData.push(calculation);
              productionsData.push(production);
              productDevelopmentsData.push(pd.productDevelopmentDataDto);
            }
          }

          // Check selected price calculations
          production.priceCalculations?.forEach((calc: any) => {
            if (calc.id && selectedPriceIdsArray.includes(calc.id)) {
              calculationsData.push(calc);
              productionsData.push(production);
              productDevelopmentsData.push(pd.productDevelopmentDataDto);
            }
          });
        });
      }
    }

    if (calculationsData.length > 1) {
      // Use the bulk fetch hook to get fresh data from backend
      handleModal(
        <BulkEditWithFreshData
          selectedPriceIds={selectedPriceIdsArray}
          productionsData={productionsData}
          productDevelopmentsData={productDevelopmentsData}
        />
      );
    } else if (calculationsData.length === 1) {
      handleModal(
        <EditPriceCalculationModal
          calculationId={calculationsData[0].id}
          filters={filters}
        />
      );
    }
  };

  const selectDeselectAll = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);
    
    // Update selectedPrices state efficiently
    if (newSelectAllState) {
      // Select all prices
      setSelectedPriceIds(new Set(Object.keys(priceMetadata)));
    } else {
      // Deselect all prices
      setSelectedPriceIds(new Set());
    }
    
    // Update selectedProduction state efficiently
    if (newSelectAllState) {
      // Select all productions
      setSelectedProductionIds(new Set(Object.keys(productionMetadata)));
    } else {
      // Deselect all productions
      setSelectedProductionIds(new Set());
    }
    
    setSelectAllIndeterminate(false);
    // getUniqueClients(); // This will be called automatically by the useEffect
  };

  const hasClosedPD = useMemo(() => {
    for (const pd of data) {
      if (pd.productDevelopmentDataDto?.status && isClosed(pd.productDevelopmentDataDto.status)) {
        for (const sp of pd.sourcedProductions || []) {
          for (const production of sp.productions || []) {
            if (production.id && selectedProductionIds.has(production.id)) {
              return true;
            }
            for (const calc of production.priceCalculations || []) {
              if (calc.id && selectedPriceIds.has(calc.id)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }, [data, selectedProductionIds, selectedPriceIds]);

  const hasClosedPDInSelectedPrices = useMemo(() => {
    const selectedPriceIdsArray = Array.from(selectedPriceIds);
    
    if (selectedPriceIdsArray.length <= 1) return false;
    
    for (const pd of data) {
      if (pd.productDevelopmentDataDto?.status && isClosed(pd.productDevelopmentDataDto.status)) {
        for (const sp of pd.sourcedProductions || []) {
          for (const production of sp.productions || []) {
            for (const calc of production.priceCalculations || []) {
              if (calc.id && selectedPriceIdsArray.includes(calc.id)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }, [data, selectedPriceIds]);

  return (
    <>
      <GridTable
        gridTemplateColumns={{ base: GRID_LAYOUT, lg: GRID_LAYOUT_DESKTOP }}>
        <GridTh colSpan={PD_COL_SPAN}>
          {t('Production.ProductDevelopments')}
        </GridTh>
        <GridTh>{t('PD.Client')}</GridTh>
        <GridTh>{t('PD.SourcingCompany')}</GridTh>
        <GridTh>{t('PD.AccordionLabels.Vendor')}</GridTh>
        <GridTh>{t('Production.Comment')}</GridTh>
        <GridTh justifyContent={'center'}>
          <Checkbox
            isChecked={selectAll}
            isIndeterminate={selectAllIndeterminate}
            onChange={selectDeselectAll}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') selectDeselectAll();
            }}
          />
        </GridTh>
        <GridTh>{t('PriceCalc.BaseValues')}</GridTh>
        <GridTh>{t('Production.Qty')}</GridTh>
        <GridTh>{t('PriceCalc.Net')}</GridTh>
        <GridTh>{t('PriceCalc.PurCurr')}</GridTh>
        <GridTh>{t('PriceCalc.SalesCurr')}</GridTh>
        <GridTh>{t('PriceCalc.Cost')}</GridTh>
        <GridTh>{t('PriceCalc.Margin')}</GridTh>
        <GridTh>{t('PriceCalc.Sales')}</GridTh>
        <GridTh />

        {selectedCheckboxes > 0 ? (
          <>
            <GridTh
              colSpan={16}
              style={{
                ...TH_STYLE,
                background: COLORS.WHITE,
                overflow: 'visible',
                top: 45,
              }}>
              <Grid
                alignItems={'center'}
                gridAutoFlow={'column'}
                gap={SPACE.SM}
                w={'100%'}
                templateColumns="auto 1fr">
                <GridItem>
                  <Text variant={'bodyBold'}>
                    {t('Filter.NumSelected', { num: selectedCheckboxes })}
                  </Text>
                </GridItem>

                <GridItem>
                  <PriceCalculationPageMenu
                    disabled={
                      selectedPriceIds.size === 0 ||
                      selectedProductionIds.size > 0 ||
                      isLoading ||
                      uniqueClients.length > 1
                    }
                    disableCreate={hasClosedPD}
                    enableEditCalculation={
                      selectedProductionIds.size > 0 || hasClosedPDInSelectedPrices
                    }
                    handleExportClick={handleExportClick}
                    handleAddPriceCalculation={handleAddPriceCalculation}
                    handleEditPriceCalculation={handleEditPriceCalculation}
                  />
                </GridItem>
              </Grid>
            </GridTh>
          </>
        ) : (
          <></>
        )}

        <Fragment>
          {data.map((p, i) => (
            <PriceCalculationsTableRow
              key={`${p.productDevelopmentDataDto?.no || i}`}
              productDevelopment={p}
              selectedPriceIds={selectedPriceIds}
              toggleSelectedPrice={stableTogglePrice}
              selectedProductionIds={selectedProductionIds}
              toggleSelectedProduction={stableToggleProduction}
            />
          ))}
        </Fragment>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
