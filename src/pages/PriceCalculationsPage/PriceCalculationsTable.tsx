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

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  const { isLoading } = useDownloadFile();
  const [selectedPrices, setSelectedPrices] = useState<SelectedPrices>({});
  const [uniqueClients, setUniqueClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectAllIndeterminate, setSelectAllIndeterminate] =
    useState<boolean>(false);
  const selectedCheckboxes = Object.values(selectedPrices).filter(
    price => price.selected
  ).length;

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
    let selectedPriceList: SelectedPrices = {};
    data?.forEach(p => {
      p.sourcedProductions?.forEach(s => {
        s.productions?.forEach(production => {
          const priceCalculation = production.priceCalculations?.[0];

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

  const selectDeselectAll = () => {
    setSelectAll(!selectAll);
    for (var key in selectedPrices) {
      if (selectedPrices.hasOwnProperty(key)) {
        selectedPrices[key].selected = !selectAll;
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
                    handleExportClick={handleExportClick}
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
            />
          ))}
        </Fragment>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
