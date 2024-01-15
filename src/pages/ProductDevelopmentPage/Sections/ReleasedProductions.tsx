import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ProductionDto } from '../../../app/generate';
import {
  TD_STYLE,
  TD_STYLE_LAST_CHILD,
  TH_STYLE,
} from '../../Productions/ProductionsTable';
import { useTranslation } from 'react-i18next';

type Props = {
  data: ProductionDto[];
};

// TODO: Update style after Productions Table
const ReleasedProductions = ({ data }: Props) => {
  const { t } = useTranslation();

  if (data.length === 0) {
    return <></>;
  }

  return (
    <Box w={'100%'}>
      <Grid gridTemplateColumns={'repeat(9, 1fr)'} w={'100%'}>
        <GridItem style={TH_STYLE}>{t('PD.AccordionLabels.Vendor')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.Comment')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.SL')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.BL')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.MOQ')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.Currency')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.Qty')}</GridItem>
        <GridItem style={TH_STYLE}>{t('Production.PUR')}</GridItem>
      </Grid>
      {data.map(p => (
        <Grid
          key={p.vendorId}
          gridTemplateColumns={'repeat(9, 1fr)'}
          w={'100%'}
          height={'100%'}>
          <GridItem style={TD_STYLE}>{p.vendorName}</GridItem>
          <GridItem style={TD_STYLE}>{p.comment}</GridItem>
          <GridItem style={TD_STYLE}>{p.sampleLeadTime}</GridItem>
          <GridItem style={TD_STYLE}>{p.productionLeadTime}</GridItem>
          <GridItem style={TD_STYLE}>{p.moq}</GridItem>
          <GridItem style={TD_STYLE}>{p.currency}</GridItem>
          {p.purchasePrices && (
            <GridItem
              style={p.purchasePrices.length === 0 ? TD_STYLE_LAST_CHILD : {}}
              colSpan={2}>
              {p.purchasePrices.map(pp => (
                <Grid>
                  <GridItem style={TD_STYLE}></GridItem>
                  <GridItem style={TD_STYLE_LAST_CHILD}></GridItem>
                </Grid>
              ))}
            </GridItem>
          )}
        </Grid>
      ))}
    </Box>
  );
};

export default ReleasedProductions;
