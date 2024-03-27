import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridTh,
  GridTable,
} from '../../components/GridTable/GridTableElements';
import PriceCalculationsTableRow from './PriceCalculationsTableRow';

const GRID_LAYOUT =
  'repeat(4, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(7, minmax(100px, 1fr))';

export const GRID_LAYOUT_SOURCING =
  'repeat(1, minmax(100px, 1fr)) [Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(7, minmax(100px, 1fr))';

export const GRID_LAYOUT_PRICE =
  '[Vendor] minmax(100px, 1fr) [Comment] 1fr [BaseValues] minmax(100px, 1fr) repeat(7, minmax(100px, 1fr))';

const GRID_LAYOUT_DESKTOP =
  'repeat(4, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';

export const GRID_LAYOUT_SOURCING_DESKTOP =
  'repeat(1, 1fr) [Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';

export const GRID_LAYOUT_PRICE_DESKTOP =
  '[Vendor] minmax(150px, 1fr) [Comment] 1fr [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <GridTable
        gridTemplateColumns={{ base: GRID_LAYOUT, lg: GRID_LAYOUT_DESKTOP }}>
        <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
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
        <>
          {data.map((p, i) => (
            <PriceCalculationsTableRow productDevelopment={p} />
          ))}
        </>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
