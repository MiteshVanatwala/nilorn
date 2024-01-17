import { GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TH_STYLE } from '../../theme/Constants/tableGrid';

function ProductionGridHeader() {
  const { t } = useTranslation();

  return (
    <>
      <GridItem style={TH_STYLE}>{t('PD.AccordionLabels.Vendor')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.Comment')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.SL')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.BL')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.MOQ')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.Currency')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.Qty')}</GridItem>
      <GridItem style={TH_STYLE}>{t('Production.PUR')}</GridItem>
    </>
  );
}

export default ProductionGridHeader;
