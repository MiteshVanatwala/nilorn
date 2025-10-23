import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import ProductionGridHeader from '../../components/ProductionGrid/ProductionGridHeader';
import {
  GridTable,
  GridTh,
} from '../../components/GridTable/GridTableElements';
import ProductionsTableRow from './ProductionsTableRow';
import { Checkbox, Grid, GridItem, Text } from '@chakra-ui/react';
import { useModal } from '../../app/hooks/useModal';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import { COLORS, SPACE } from '../../theme/Constants';
import { TH_STYLE } from '../../theme/Constants/tableGrid';
import ProductionExcelExportModalContent from '../../components/ExcelExport/ProductionExcelExportModalContent';
import ProductionPageMenu from './ProductionPageMenu';

const GRID_LAYOUT_DESKTOP =
  'repeat(4, 1fr) [Checkbox] minmax(50px, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, 1fr)';
export const GRID_LAYOUT_SOURCING_DESKTOP =
  'repeat(1, 1fr) [Checkbox] minmax(50px, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, 1fr)';
export const GRID_LAYOUT_PRODUCTION_DESKTOP =
  '[Vendor] minmax(230px, 1fr) repeat(5, 1fr)';

const GRID_LAYOUT =
  'repeat(4, minmax(100px, 1fr)) [Checkbox] minmax(50px, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, minmax(100px, 1fr))';
export const GRID_LAYOUT_SOURCING =
  'repeat(1, minmax(100px, 1fr)) [Checkbox] minmax(50px, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, minmax(100px, 1fr))';
export const GRID_LAYOUT_PRODUCTION =
  '[Vendor] minmax(230px, 1fr) repeat(5, 1fr)';

export type SelectedProductions = {
  [key: string]: {
    selected: boolean;
    client: string;
    productDevelopmentNo: string;
  };
};

type Props = {
  productions: ProductDevelopmentDeepDto[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  const { isLoading } = useDownloadFile();
  const [selectedProductions, setSelectedProductions] = useState<SelectedProductions>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectAllIndeterminate, setSelectAllIndeterminate] = useState<boolean>(false);
  const selectedCheckboxes = Object.values(selectedProductions).filter(
    production => production.selected
  ).length;

  useEffect(() => {
    let selectedCount = 0;
    for (var key in selectedProductions) {
      if (
        selectedProductions.hasOwnProperty(key) &&
        selectedProductions[key]?.selected === true
      ) {
        selectedCount++;
      }
    }
    if (selectedCount > 0) {
      setSelectAll(Object.keys(selectedProductions).length === selectedCount);
      setSelectAllIndeterminate(
        Object.keys(selectedProductions).length !== selectedCount
      );
    } else {
      setSelectAll(false);
      setSelectAllIndeterminate(false);
    }
  }, [selectedProductions]);

  useEffect(() => {
    let selectedProductionList: SelectedProductions = {};
    productions?.forEach(p => {
      p.sourcedProductions?.forEach(s => {
        s.productions?.forEach(production => {
          if (production?.id) {
            selectedProductionList[`${production.id}`] = {
              selected: false,
              client: p.productDevelopmentDataDto?.clientName || '',
              productDevelopmentNo: p.productDevelopmentDataDto?.no || '',
            };
          }
        });
      });
    });
    setSelectedProductions(selectedProductionList);
  }, [productions]);


  const handleExportClick = async () => {
    handleModal(<ProductionExcelExportModalContent selectedProductions={selectedProductions} />);
  };

  const selectDeselectAll = () => {
    setSelectAll(!selectAll);
    for (var key in selectedProductions) {
      if (selectedProductions.hasOwnProperty(key)) {
        selectedProductions[key].selected = !selectAll;
      }
    }
    setSelectAllIndeterminate(false);
  };

  return (
    <>
      <GridTable
        gridTemplateColumns={{ base: GRID_LAYOUT, lg: GRID_LAYOUT_DESKTOP }}>
        <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
        <GridTh>{t('PD.Client')}</GridTh>
        <GridTh>{t('PD.SourcingCompany')}</GridTh>
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
        <ProductionGridHeader />
        {selectedCheckboxes > 0 ? (
          <>
            <GridTh
              colSpan={11}
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
                  <ProductionPageMenu
                    disabled={
                      !Object.values(selectedProductions)
                        .map(val => val.selected)
                        .some(Boolean) ||
                      isLoading
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
          {productions.map((p, i) => (
            <ProductionsTableRow
              key={`ProductionsTableRow_${p.productDevelopmentDataDto?.no}_${i}`}
              productDevelopment={p}
              selectedProductions={selectedProductions}
              setSelectedProductions={setSelectedProductions}
            />
          ))}
        </Fragment>
      </GridTable>
    </>
  );
};

export default ProductionsTable;
