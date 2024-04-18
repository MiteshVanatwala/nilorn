import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import ProductionGridHeader from '../../components/ProductionGrid/ProductionGridHeader';
import {
  GridTable,
  GridTh,
} from '../../components/GridTable/GridTableElements';
import ProductionsTableRow from './ProductionsTableRow';

const GRID_LAYOUT_DESKTOP =
  'repeat(4, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, 1fr)';
export const GRID_LAYOUT_SOURCING_DESKTOP =
  'repeat(1, 1fr) [Vendor] minmax(230px, 1fr) repeat(5, 1fr)';
export const GRID_LAYOUT_PRODUCTION_DESKTOP =
  '[Vendor] minmax(230px, 1fr) repeat(5, 1fr)';

const GRID_LAYOUT =
  'repeat(4, minmax(100px, 1fr)) [Vendor] minmax(230px, 1fr) repeat(5, minmax(100px, 1fr))';
export const GRID_LAYOUT_SOURCING =
  'repeat(1, minmax(100px, 1fr)) [Vendor] minmax(230px, 1fr) repeat(5, minmax(100px, 1fr))';
export const GRID_LAYOUT_PRODUCTION =
  '[Vendor] minmax(230px, 1fr) repeat(5, minmax(100px, 1fr))';

type Props = {
  productions: ProductDevelopmentDeepDto[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

  return (
    <GridTable
      gridTemplateColumns={{ base: GRID_LAYOUT, lg: GRID_LAYOUT_DESKTOP }}>
      <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
      <GridTh>{t('PD.Client')}</GridTh>
      <GridTh>{t('PD.SourcingCompany')}</GridTh>
      <ProductionGridHeader />
      <>
        {productions.map((p, i) => (
          <ProductionsTableRow
            key={`ProductionsTableRow_${p.productDevelopmentDataDto?.no}_${i}`}
            productDevelopment={p}
          />
        ))}
      </>
    </GridTable>
  );
};

export default ProductionsTable;
