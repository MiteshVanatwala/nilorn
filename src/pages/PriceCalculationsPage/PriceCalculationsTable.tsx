// PriceCalculationsTable.tsx
import { useTranslation } from 'react-i18next';
import { Fragment, useState } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridTh,
  GridTable,
} from '../../components/GridTable/GridTableElements';
import PriceCalculationsTableRow from './PriceCalculationsTableRow';
import { Button } from '@chakra-ui/react';

const GRID_LAYOUT =
  'minmax(50px, 0.5fr) repeat(4, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

export const GRID_LAYOUT_SOURCING =
  'repeat(1, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

export const GRID_LAYOUT_PRICE =
  '[Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(8, minmax(100px, 1fr))';

const GRID_LAYOUT_DESKTOP =
  'minmax(50px, 0.5fr) repeat(4, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const GRID_LAYOUT_SOURCING_DESKTOP =
  'repeat(1, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const GRID_LAYOUT_PRICE_DESKTOP =
  '[Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(8, 1fr)';

export const PD_COL_SPAN = 2;
export const SOURCING_COL_SPAN = 1;

export const ROW_SPAN = 14;
export const VENDOR_ROW_SPAN = 11;
export const CALCULATION_ROW_SPAN = 9;
export const PRICE_ROW_SPAN = 4;

export type SelectedPrices = {
  [key: string]: boolean;
};

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const [selectedPrices, setSelectedPrices] = useState<SelectedPrices>({});

  const handleExportClick = async () => {
    const selectedIds = Object.entries(selectedPrices)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);
  
    const excelExportOptions = selectedIds.map(id => ({
      PriceCalculationId: id,
      Valid: true,
      Included: true,
      No: true,
      Name: true,
      ThumbnailData: true,
      ItemNo: true,
      Description: true,
      Version: true,
      Quantity: true,
      Certificate: true,
      SalesPrice: true,
      SalesCurrency: true,
      PurchaseCurrency: true,
      PurchasePrice: true,
      MOQ: true
    }));

    console.log('Data to send to endpoint:', JSON.stringify(excelExportOptions, null, 2)); /*SHOULD IT BE , null, 2 ?????*/ 

    try {
      const response = await fetch('/api/GetExcel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(excelExportOptions),
        // Add this for development only
        ...(process.env.NODE_ENV === 'development' && {
          rejectUnauthorized: false
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'price-calculations.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
    } catch (error) {
      console.error('Export failed:', error);
      // Add proper error handling here
    }
  };

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={handleExportClick}
        mb={4}
        isDisabled={!Object.values(selectedPrices).some(Boolean)}
      >
        {t('Export Selected')}
      </Button>

      <GridTable gridTemplateColumns={{ base: GRID_LAYOUT, lg: GRID_LAYOUT_DESKTOP }}>
        <GridTh colSpan={PD_COL_SPAN}>
          {t('Production.ProductDevelopments')}
        </GridTh>
        <GridTh>{t('PD.Client')}</GridTh>
        <GridTh>{t('PD.SourcingCompany')}</GridTh>
        <GridTh>{t('PD.AccordionLabels.Vendor')}</GridTh>
        <GridTh>{t('Production.Comment')}</GridTh>
        <GridTh>{t('PriceCalc.BaseValues')}</GridTh>
        <GridTh>{t('Production.Qty')}</GridTh>
        <GridTh>{t('PriceCalc.Net')}</GridTh>
        <GridTh>{t('PriceCalc.PurCurr')}</GridTh>
        <GridTh>{t('PriceCalc.SalesCurr')}</GridTh>
        <GridTh>{t('PriceCalc.Cost')}</GridTh>
        <GridTh>{t('PriceCalc.Margin')}</GridTh>
        <GridTh>{t('PriceCalc.Sales')}</GridTh>
        <GridTh />

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
