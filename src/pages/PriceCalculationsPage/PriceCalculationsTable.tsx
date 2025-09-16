// PriceCalculationsTable.tsx
import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState } from 'react';
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
    let selectedCount = 0;
    for (var key in selectedPrices) {
      if (
        selectedPrices.hasOwnProperty(key) &&
        selectedPrices[key]?.selected === true
      ) {
        selectedCount++;
      }
    }
    if (selectedCount > 0) {
      setSelectAll(Object.keys(selectedPrices).length === selectedCount);
      setSelectAllIndeterminate(
        Object.keys(selectedPrices).length !== selectedCount
      );
    } else {
      setSelectAll(false);
      setSelectAllIndeterminate(false);
    }
    getUniqueClients();
  }, [selectedPrices]);

  useEffect(() => {
    let selectedCount = 0;
    for (var key in selectedProduction) {
      if (
        selectedProduction.hasOwnProperty(key) &&
        selectedProduction[key]?.selected === true
      ) {
        selectedCount++;
      }
    }
    if (selectedCount > 0) {
      setSelectAll(Object.keys(selectedProduction).length === selectedCount);
      setSelectAllIndeterminate(
        Object.keys(selectedProduction).length !== selectedCount
      );
    } else {
      setSelectAll(false);
      setSelectAllIndeterminate(false);
    }
  }, [selectedProduction]);

  useEffect(() => {
    let selectedPriceList: SelectedPrices = {};
    let selectedProductionList: SelectedProduction = {};
    data?.forEach(p => {
      p.sourcedProductions?.forEach(s => {
        s.productions?.forEach(production => {
          const priceCalculations = production.priceCalculations || [];
          selectedProductionList[`${production.id}`] = {
            selected: false,
            client: p.productDevelopmentDataDto?.clientName || '',
            productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
          };
          // Add all price calculations to the selected list
          priceCalculations.forEach(priceCalculation => {
            if (priceCalculation?.id) {
              selectedPriceList[`${priceCalculation.id}`] = {
                selected: false,
                client: p.productDevelopmentDataDto?.clientName || '',
                productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
              };
            }
          });
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
    const selectedProductionIds = Object.entries(selectedProduction)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key);

    const selectedPriceIds = Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key);

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

      if (productionsData.length > 1) {
        handleModal(
          <BulkCreatePriceCalculationModal
            production={productionsData}
            calculation={calculationsData}
          />
        );
      } else if (productionsData.length === 1) {
        handleModal(
          <CreatePriceCalculationModal
            productDevelopment={productDevelopmentsData[0]}
            production={productionsData[0]}
            calculation={calculationsData[0]}
            sourcedProduction={sourcedProductionsData[0]}
            artwork={productionsData[0].artwork}
            lastModified={productionsData[0].lastModified}
            filters={productionsData[0]?.filters}
          />
        );
      }
    }
  };

  const handleEditPriceCalculation = () => {
    // Get selected price calculation IDs
    const selectedPriceIds = Object.entries(selectedPrices)
      .filter(([_, value]) => value.selected)
      .map(([key]) => key);

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
      handleModal(
        <BulkEditPriceCalculationModal
          calculations={calculationsData}
          productions={productionsData}
          productDevelopments={productDevelopmentsData}
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
    setSelectAll(!selectAll);
    for (var key in selectedPrices) {
      if (selectedPrices.hasOwnProperty(key)) {
        selectedPrices[key].selected = !selectAll;
      }
    }
    for (var keyProd in selectedProduction) {
      if (selectedProduction.hasOwnProperty(keyProd)) {
        selectedProduction[keyProd].selected = !selectAll;
      }
    }
    setSelectAllIndeterminate(false);
    getUniqueClients();
  };

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
                      isLoading ||
                      uniqueClients.length > 1
                    }
                    enableEditCalculation={
                      Object.values(selectedProduction).filter(
                        production => production.selected
                      ).length > 0
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
