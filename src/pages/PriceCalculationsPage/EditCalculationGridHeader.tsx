import { useTranslation } from 'react-i18next';
import { GridTh } from '../../components/GridTable/GridTableElements';
import { TH_STYLE_CALCULATION } from '../../theme/Constants/tableGrid';

function EditCalculationGridHeader() {
  const { t } = useTranslation();

  return (
    <>
      <GridTh style={TH_STYLE_CALCULATION}>{t('PriceCalc.Net')}</GridTh>
      <GridTh style={TH_STYLE_CALCULATION}>{t('Production.Qty')}</GridTh>
      <GridTh style={TH_STYLE_CALCULATION}>
        {t('PriceCalc.Margin') + t('PriceCalc.Percentage')}
      </GridTh>
      <GridTh style={TH_STYLE_CALCULATION}>{t('PriceCalc.Cost')}</GridTh>
      <GridTh style={TH_STYLE_CALCULATION}>{t('PriceCalc.Sales')}</GridTh>
    </>
  );
}

export default EditCalculationGridHeader;
