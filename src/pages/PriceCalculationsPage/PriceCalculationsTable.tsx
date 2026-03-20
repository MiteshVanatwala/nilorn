// PriceCalculationsTable.tsx
import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState, useMemo } from 'react';
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
  const {
    data: freshCalculations,
    isError: isBulkPriceCalculationsError,
    error: bulkPriceCalculationsError,
  } = useBulkPriceCalculationsBatch(selectedPriceIds);
  
  return (
    <BulkEditPriceCalculationModal
      calculations={freshCalculations ?? []}
      productions={productionsData}
      productDevelopments={productDevelopmentsData}
      hasLoadError={isBulkPriceCalculationsError}
      loadError={bulkPriceCalculationsError}
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
  const {
    isLoading: calculationsLoading,
    isError: isBulkPriceCalculationsError,
    error: bulkPriceCalculationsError,
  } = useBulkPriceCalculationsBatch(selectedPriceIds);
  
  // Get all production IDs from productionsData (both selected productions and productions with selected prices)
  // Remove duplicates to avoid multiple API calls for the same production
  const allProductionIds = useMemo(() => 
    [...new Set(productionsData.map(prod => prod.id).filter(Boolean))], 
    [productionsData]
  );
  const {
    data: freshProductions,
    isLoading: productionsLoading,
    isError: isBulkProductionsError,
    error: bulkProductionsError,
  } = useBulkProductionsBatch(allProductionIds);
  
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
        hasLoadError={Boolean(isBulkPriceCalculationsError || isBulkProductionsError)}
        loadError={bulkPriceCalculationsError ?? bulkProductionsError}
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
  const [selectedPrices, setSelectedPrices] = useState<SelectedPrices>({});
  const [selectedProduction, setSelectedProduction] =
    useState<SelectedProduction>({});
  const [uniqueClients, setUniqueClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectAllIndeterminate, setSelectAllIndeterminate] =
    useState<boolean>(false);
  const selectedCheckboxes =
    Object.values(selectedPrices).filter(price => price.selected).length +
    Object.values(selectedProduction).filter(production => production.selected)
      .length;

  useEffect(() => {
    // Count selected prices
    let selectedPricesCount = 0;
    for (var key in selectedPrices) {
      if (
        selectedPrices.hasOwnProperty(key) &&
        selectedPrices[key]?.selected === true
      ) {
        selectedPricesCount++;
      }
    }

    // Count selected productions
    let selectedProductionCount = 0;
    for (var key in selectedProduction) {
      if (
        selectedProduction.hasOwnProperty(key) &&
        selectedProduction[key]?.selected === true
      ) {
        selectedProductionCount++;
      }
    }

    const totalSelectedCount = selectedPricesCount + selectedProductionCount;
    const totalItemsCount = Object.keys(selectedPrices).length + Object.keys(selectedProduction).length;

    if (totalSelectedCount > 0) {
      setSelectAll(totalItemsCount === totalSelectedCount);
      setSelectAllIndeterminate(totalItemsCount !== totalSelectedCount);
    } else {
      setSelectAll(false);
      setSelectAllIndeterminate(false);
    }
    getUniqueClients();
  }, [selectedPrices, selectedProduction]);

  useEffect(() => {
    let selectedPriceList: SelectedPrices = {};
    let selectedProductionList: SelectedProduction = {};
    data?.forEach(p => {
      p.sourcedProductions?.forEach(s => {
        s.productions?.forEach(production => {
          const priceCalculations = production.priceCalculations || [];
          
          // If production has price calculations, only add the price calculations to the list
          if (priceCalculations.length > 0) {
            priceCalculations.forEach(priceCalculation => {
              if (priceCalculation?.id) {
                selectedPriceList[`${priceCalculation.id}`] = {
                  selected: false,
                  client: p.productDevelopmentDataDto?.clientName || '',
                  productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
                };
              }
            });
          } else {
            // If production has no price calculations, add the production to the list
            selectedProductionList[`${production.id}`] = {
              selected: false,
              client: p.productDevelopmentDataDto?.clientName || '',
              productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
            };
          }
        });
      });
    });
    setSelectedProduction(selectedProductionList);
    setSelectedPrices(selectedPriceList);
  }, [data]);

  const getUniqueClients = () => {
    setUniqueClients(
      Object.values(selectedPrices)
        .filter(val => val.selected === true)
        .map(val => val.client)
        .filter((x, i, a) => a.indexOf(x) === i)
    );
  };

  const handleExportClick = async () => {
    handleModal(<ExcelExportModalContent selectedPrices={selectedPrices} />);
  };

  const handleAddPriceCalculation = () => {
    // Get all selected production and price IDs
    const selectedProductionIds = [...new Set(Object.entries(selectedProduction)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key))];

    const selectedPriceIds = [...new Set(Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key))];

    // Arrays to store the calculation data (matching handleEditPriceCalculation pattern)
    const calculationsData: any[] = [];
    const productionsData: any[] = [];
    const productDevelopmentsData: any[] = [];
    const sourcedProductionsData: any[] = [];

    if (selectedProductionIds.length > 0 || selectedPriceIds.length > 0) {
      // Search through the data structure to find all matching productions and prices
      for (const pd of data) {
        for (const sp of pd.sourcedProductions || []) {
          // Handle selected productions
          const productions = sp.productions?.filter(
            p => p.id && selectedProductionIds.includes(p.id)
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
                calc => calc.id && selectedPriceIds.includes(calc.id)
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
          selectedProductionIds={selectedProductionIds}
          selectedPriceIds={selectedPriceIds}
          productionsData={productionsData}
          productDevelopmentsData={productDevelopmentsData}
          sourcedProductionsData={sourcedProductionsData}
        />
      );
    }
  };

  const handleEditPriceCalculation = () => {
    // Get selected price calculation IDs
    const selectedPriceIds = [...new Set(Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key))];

    // Arrays to store the calculation data
    const calculationsData: any[] = [];
    const productionsData: any[] = [];
    const productDevelopmentsData: any[] = [];

    // Collect data for selected prices and productions
    for (const pd of data) {
      for (const sp of pd.sourcedProductions || []) {
        sp.productions?.forEach((production: any) => {
          // Check selected productions
          if (selectedProduction[production?.id]?.selected) {
            const calculation = production.priceCalculations;
            if (calculation) {
              calculationsData.push(calculation);
              productionsData.push(production);
              productDevelopmentsData.push(pd.productDevelopmentDataDto);
            }
          }

          // Check selected price calculations
          production.priceCalculations?.forEach((calc: any) => {
            if (calc.id && selectedPriceIds.includes(calc.id)) {
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
          selectedPriceIds={selectedPriceIds}
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
    
    // Update selectedPrices state properly
    setSelectedPrices(prev => {
      const newState = { ...prev };
      for (var key in newState) {
        if (newState.hasOwnProperty(key)) {
          newState[key] = {
            ...newState[key],
            selected: newSelectAllState,
          };
        }
      }
      return newState;
    });
    
    // Update selectedProduction state properly
    setSelectedProduction(prev => {
      const newState = { ...prev };
      for (var keyProd in newState) {
        if (newState.hasOwnProperty(keyProd)) {
          newState[keyProd] = {
            ...newState[keyProd],
            selected: newSelectAllState,
          };
        }
      }
      return newState;
    });
    
    setSelectAllIndeterminate(false);
    // getUniqueClients(); // This will be called automatically by the useEffect
  };

  const hasClosedPD = useMemo(() => {
    for (const pd of data) {
      if (pd.productDevelopmentDataDto?.status && isClosed(pd.productDevelopmentDataDto.status)) {
        for (const sp of pd.sourcedProductions || []) {
          for (const production of sp.productions || []) {
            if (production.id && selectedProduction[production.id]?.selected) {
              return true;
            }
            for (const calc of production.priceCalculations || []) {
              if (calc.id && selectedPrices[calc.id]?.selected) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }, [data, selectedProduction, selectedPrices]);

  const hasClosedPDInSelectedPrices = useMemo(() => {
    const selectedPriceIds = Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key);
    
    if (selectedPriceIds.length <= 1) return false;
    
    for (const pd of data) {
      if (pd.productDevelopmentDataDto?.status && isClosed(pd.productDevelopmentDataDto.status)) {
        for (const sp of pd.sourcedProductions || []) {
          for (const production of sp.productions || []) {
            for (const calc of production.priceCalculations || []) {
              if (calc.id && selectedPriceIds.includes(calc.id)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }, [data, selectedPrices]);

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
                      !Object.values(selectedPrices)
                        .map(val => val.selected)
                        .some(Boolean) ||
                      Object.values(selectedProduction)
                        .map(val => val.selected)
                        .some(Boolean) ||
                      isLoading ||
                      uniqueClients.length > 1
                    }
                    disableCreate={hasClosedPD}
                    enableEditCalculation={
                      Object.values(selectedProduction).filter(
                        production => production.selected
                      ).length > 0 || hasClosedPDInSelectedPrices
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
              key={i}
              productDevelopment={p}
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
              selectedProduction={selectedProduction}
              setSelectedProduction={setSelectedProduction}
            />
          ))}
        </Fragment>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
