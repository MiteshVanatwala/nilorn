import { useTranslation } from 'react-i18next';
import { GridTh } from '../GridTable/GridTableElements';

function ProductionGridHeader() {
  const { t } = useTranslation();

  return (
    <>
      <GridTh>{t('PD.AccordionLabels.Vendor')}</GridTh>
      <GridTh>{t('Production.Comment')}</GridTh>
      <GridTh>{t('Production.MOQ')}</GridTh>
      <GridTh>{t('Production.Currency')}</GridTh>
      <GridTh>{t('Production.Qty')}</GridTh>
      <GridTh>{t('Production.PUR')}</GridTh>
    </>
  );
}

export default ProductionGridHeader;
