import { GridItem } from '@chakra-ui/react';
import PDCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import TableMenuContainer from './TableMenuContainer';
import TableMenuProduction from './TableMenuProduction';
import TableMenuSourcing from './TableMenuSourcing';
import ProductionGridRow from '../../components/ProductionGrid/ProductionGridRow';
import ProductionGridHeader from '../../components/ProductionGrid/ProductionGridHeader';
import { TD_STYLE, TD_STYLE_RELEASED } from '../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTable,
  GridTd,
  GridTh,
} from '../../components/GridTable/GridTableElements';
import { Fragment } from 'react';
import { isClosed } from '../../app/utils/status';

const GRID_LAYOUT = 'repeat(4, 1fr) [Vendor] minmax(170px, 1fr) repeat(7, 1fr)';
const GRID_LAYOUT_SOURCING =
  'repeat(1, 1fr) [Vendor] minmax(170px, 1fr) repeat(7, 1fr)';
export const GRID_LAYOUT_PRODUCTION =
  '[Vendor] minmax(170px, 1fr) repeat(7, 1fr)';

type Props = {
  productions: ProductDevelopmentDeepDto[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

  return (
    <GridTable gridTemplateColumns={GRID_LAYOUT}>
      <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
      <GridTh>{t('PD.Client')}</GridTh>
      <GridTh>{t('PD.SourcingCompany')}</GridTh>
      <ProductionGridHeader />
      <>
        {productions.map(p => (
          <Fragment key={p?.productDevelopmentBriefDto?.no}>
            <GridTd colSpan={2}>
              <PDCell {...p.productDevelopmentBriefDto} />
            </GridTd>
            <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
            <GridItem colSpan={9}>
              <GridInlineTbody gridTemplateColumns={GRID_LAYOUT_SOURCING}>
                {p.sourcedProductions?.map((s, index) => (
                  <>
                    <GridTd
                      key={
                        p?.productDevelopmentBriefDto?.no + '-' + s?.sourcingId
                      }
                      style={TD_STYLE}>
                      <>
                        {s.sourcingCompanyCode}
                        {p.productDevelopmentBriefDto?.status &&
                          !isClosed(p.productDevelopmentBriefDto.status) && (
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
                          )}
                      </>
                    </GridTd>
                    <GridItem
                      colSpan={8}
                      style={
                        s.productions?.length === 0 ? TD_STYLE : undefined
                      }>
                      <GridInlineTbody
                        gridTemplateColumns={GRID_LAYOUT_PRODUCTION}>
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
                      </GridInlineTbody>
                    </GridItem>
                  </>
                ))}
              </GridInlineTbody>
            </GridItem>
          </Fragment>
        ))}
      </>
    </GridTable>
  );
};

export default ProductionsTable;
