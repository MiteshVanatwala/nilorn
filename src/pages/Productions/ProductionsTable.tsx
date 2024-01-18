import { Box, Grid, GridItem } from '@chakra-ui/react';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import TableMenuContainer from './TableMenuContainer';
import TableMenuProduction from './TableMenuProduction';
import TableMenuSourcing from './TableMenuSourcing';
import ProductionGridRow, {
  PRODUCTIONS_NUM_OF_FR,
} from '../../components/ProductionGrid/ProductionGridRow';
import ProductionGridHeader from '../../components/ProductionGrid/ProductionGridHeader';
import {
  TD_STYLE,
  TD_STYLE_RELEASED,
  TH_STYLE,
} from '../../theme/Constants/tableGrid';

type Props = {
  productions: ProductDevelopmentDeepDto[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Grid
          h={'4.6rem'}
          lineHeight={1.15}
          gridTemplateColumns={'repeat(12, 1fr)'}>
          <GridItem colSpan={2} style={TH_STYLE}>
            {t('Production.ProductDevelopments')}
          </GridItem>
          <GridItem style={TH_STYLE}>{t('PD.Client')}</GridItem>
          <GridItem style={TH_STYLE}>{t('PD.SourcingCompany')}</GridItem>
          <ProductionGridHeader />
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
                  {p.sourcedProductions?.map((s, index) => (
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
                          <TableMenuContainer
                            children={
                              <TableMenuSourcing
                                productDevelopment={
                                  p?.productDevelopmentBriefDto
                                }
                                sourcedProduction={s}
                                sourcingCoIndex={index}
                              />
                            }
                          />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={PRODUCTIONS_NUM_OF_FR}>
                        <Grid
                          gap={'1px'}
                          gridTemplateColumns={`repeat(${PRODUCTIONS_NUM_OF_FR}, 1fr)`}
                          alignItems={'stretch'}
                          height={'100%'}>
                          {s.productions?.map(production => (
                            <ProductionGridRow
                              key={production?.id}
                              production={production}
                              style={
                                production?.released
                                  ? TD_STYLE_RELEASED
                                  : TD_STYLE
                              }
                              tableMenu={
                                <TableMenuContainer
                                  children={
                                    <TableMenuProduction
                                      productDevelopment={
                                        p?.productDevelopmentBriefDto
                                      }
                                      sourcedProduction={s}
                                      sourcingCoIndex={index}
                                      production={production}
                                    />
                                  }
                                />
                              }
                            />
                          ))}
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
