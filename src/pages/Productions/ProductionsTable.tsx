import { Box, Grid, GridItem } from '@chakra-ui/react';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import { CSSProperties } from 'react';
import TableMenu from './TableMenu';
import TableMenuSourcing from './TableMenuSourcing';

import { ProductDevelopmentProductionDto } from '../../app/generate';
import table from '../../theme/table';
import { COLORS, SPACE } from '../../theme/Constants';

type Props = {
  productions: ProductDevelopmentProductionDto[];
};

const TH_STYLE: CSSProperties = {
  ...table.baseStyle?.th,
  height: 'auto',
  textTransform: 'none',
};

const TD_STYLE_RELEASED: CSSProperties = {
  ...table.baseStyle?.td,
  height: 'auto',
  borderTop: 'none',
  boxShadow: `${'0 0 0 1px' + COLORS.GRAY[20]}`,
  border: 'none',
  backgroundColor: COLORS.GREEN.TINT,
  display: 'flex',
  alignItems: 'center',
};

const TD_STYLE: CSSProperties = {
  ...table.baseStyle?.td,
  height: 'auto',
  borderTop: 'none',
  boxShadow: `${'0 0 0 1px' + COLORS.GRAY[20]}`,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
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
      <Grid gap={'1px'}>
        {productions.map(p => (
          <Grid
            gap={'1px'}
            gridTemplateColumns={'repeat(12, 1fr)'}
            alignItems={'stretch'}>
            <>
              <GridItem py={SPACE.XS} colSpan={2} style={TD_STYLE}>
                <PDCell {...p.productDevelopmentBriefDto} />
              </GridItem>
              <GridItem style={TD_STYLE}>
                {p.productDevelopmentBriefDto?.client}
              </GridItem>
              <GridItem colSpan={9}>
                <Grid
                  gap={'1px'}
                  gridTemplateColumns={'repeat(9, 1fr)'}
                  height={'100%'}
                  alignItems={'stretch'}>
                  {p.sourcedProductions?.map(s => (
                    <>
                      <GridItem
                        key={
                          p?.productDevelopmentBriefDto?.no +
                          '-' +
                          s?.sourcingId
                        }
                        style={TD_STYLE}>
                        <Box>
                          {s.name}
                          <TableMenuSourcing
                            productDevelopment={p?.productDevelopmentBriefDto}
                            sourcedProduction={s}
                            vendorIndex={0}
                          />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={8}>
                        <Grid
                          gap={'1px'}
                          gridTemplateColumns={'repeat(8, 1fr)'}
                          alignItems={'stretch'}
                          height={'100%'}>
                          {s.productions?.map(production => (
                            <>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }
                                overflow={'hidden'}>
                                {production.vendorName}
                                <TableMenu
                                  productDevelopment={
                                    p?.productDevelopmentBriefDto
                                  }
                                  sourcedProduction={s}
                                  vendorIndex={0}
                                />
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }>
                                {production.comment}
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }>
                                {production.sampleLeadTime}
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }>
                                {production.productionLeadTime}
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }>
                                {production.moq}
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }
                                overflow={'hidden'}>
                                {production.currency}
                              </GridItem>
                              <GridItem
                                style={
                                  production?.released
                                    ? TD_STYLE_RELEASED
                                    : TD_STYLE
                                }
                                colSpan={2}>
                                [QTY PUR] in api data atm
                              </GridItem>
                            </>
                          ))}
                          {/* 
                        {s.productions?.length === 0 && (
                          <GridItem style={TD_STYLE_LAST_CHILD} colSpan={9}>
                            No productions
                          </GridItem>
                        )} */}
                        </Grid>
                      </GridItem>
                    </>
                  ))}
                </Grid>
              </GridItem>
            </>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductionsTable;
