import { Box, Grid, GridItem } from '@chakra-ui/react';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import React, { CSSProperties } from 'react';
import TabelMenu from './TableMenu';
import { ProductDevelopmentProductionDto } from '../../app/generate';
import table from '../../theme/table';

type Props = {
  productions: ProductDevelopmentProductionDto[];
};

export const TH_STYLE: CSSProperties = {
  ...table.baseStyle?.th,
  height: 'auto',
  textTransform: 'none',
};

export const TD_STYLE_LAST_CHILD: CSSProperties = {
  ...table.baseStyle?.td,
  overflow: 'hidden',
  height: 'auto',
  borderTop: 'none',
};

export const TD_STYLE: CSSProperties = {
  ...TD_STYLE_LAST_CHILD,
  borderRight: 'none',
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Grid gridTemplateColumns={'repeat(12, 1fr)'}>
          <GridItem colSpan={2} style={TH_STYLE}>
            {t('Production.ProductDevelopments')}
          </GridItem>
          <GridItem style={TH_STYLE}>{t('PD.Client')}</GridItem>
          <GridItem style={TH_STYLE}>{t('PD.SourcingCompany')}</GridItem>
          <GridItem style={TH_STYLE}>{t('PD.AccordionLabels.Vendor')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.Comment')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.SL')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.BL')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.MOQ')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.Currency')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.Qty')}</GridItem>
          <GridItem style={TH_STYLE}>{t('Production.PUR')}</GridItem>
        </Grid>
      </Box>
      {productions.map(p => (
        <Grid gridTemplateColumns={'repeat(12, 1fr)'} alignItems={'stretch'}>
          <>
            <GridItem colSpan={2} style={TD_STYLE}>
              <PDCell {...p.productDevelopmentBriefDto} />
            </GridItem>
            <GridItem style={TD_STYLE}>
              {p.productDevelopmentBriefDto?.client}
            </GridItem>
            <GridItem colSpan={9}>
              <Grid
                gridTemplateColumns={'repeat(9, 1fr)'}
                height={'100%'}
                alignItems={'stretch'}>
                {p.sourcedProductions?.map(s => (
                  <>
                    <GridItem style={TD_STYLE}>
                      {s.name}
                      <TabelMenu />
                    </GridItem>
                    <GridItem colSpan={8}>
                      <Grid
                        gridTemplateColumns={'repeat(8, 1fr)'}
                        alignItems={'stretch'}
                        height={'100%'}>
                        {s.productions?.map(p => (
                          <>
                            <GridItem style={TD_STYLE} overflow={'hidden'}>
                              {p.vendorName}
                              <TabelMenu />
                            </GridItem>
                            <GridItem style={TD_STYLE}>{p.comment}</GridItem>
                            <GridItem style={TD_STYLE}>
                              {p.sampleLeadTime}
                            </GridItem>
                            <GridItem style={TD_STYLE}>
                              {p.productionLeadTime}
                            </GridItem>
                            <GridItem style={TD_STYLE}>{p.moq}</GridItem>
                            <GridItem style={TD_STYLE} overflow={'hidden'}>
                              {p.currencyCode}
                            </GridItem>
                            <GridItem style={TD_STYLE_LAST_CHILD} colSpan={2}>
                              [QTY PUR] in api data atm
                            </GridItem>
                          </>
                        ))}

                        {s.productions?.length === 0 && (
                          <GridItem style={TD_STYLE_LAST_CHILD} colSpan={9}>
                            No productions
                          </GridItem>
                        )}
                      </Grid>
                    </GridItem>
                  </>
                ))}
              </Grid>
            </GridItem>
          </>
        </Grid>
      ))}
    </>
  );
};

export default ProductionsTable;
