import { GridItem } from '@chakra-ui/react';
import PDCell from './ProductDevelopmentCell';
import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import TableMenuContainer from './TableMenuContainer';
import TableMenuProduction from './TableMenuProduction';
import TableMenuSourcing from './TableMenuSourcing';
import ProductionGridRow, {
  PRODUCTIONS_NUM_OF_FR,
} from '../../components/ProductionGrid/ProductionGridRow';
import ProductionGridHeader from '../../components/ProductionGrid/ProductionGridHeader';
import { TD_STYLE, TD_STYLE_RELEASED } from '../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTable,
  GridTd,
  GridTh,
} from '../../components/GridTable/GridTableElements';

type Props = {
  productions: ProductDevelopmentDeepDto[];
};

const ProductionsTable = ({ productions }: Props) => {
  const { t } = useTranslation();

  return (
    <GridTable numFr={12}>
      <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
      <GridTh>{t('PD.Client')}</GridTh>
      <GridTh>{t('PD.SourcingCompany')}</GridTh>
      <ProductionGridHeader />
      <>
        {productions.map(p => (
          <GridItem colSpan={12}>
            <GridInlineTbody numFr={12}>
              <GridTd colSpan={2}>
                <PDCell {...p.productDevelopmentBriefDto} />
              </GridTd>
              <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
              <GridItem colSpan={9}>
                <GridInlineTbody numFr={9}>
                  {p.sourcedProductions?.map((s, index) => (
                    <>
                      <GridTd
                        key={
                          p?.productDevelopmentBriefDto?.no +
                          '-' +
                          s?.sourcingId
                        }
                        style={TD_STYLE}>
                        <>
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
                        </>
                      </GridTd>
                      <GridItem
                        colSpan={PRODUCTIONS_NUM_OF_FR}
                        style={
                          s.productions?.length === 0 ? TD_STYLE : undefined
                        }>
                        <GridInlineTbody numFr={PRODUCTIONS_NUM_OF_FR}>
                          {s.productions?.map(production => (
                            <ProductionGridRow
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
            </GridInlineTbody>
          </GridItem>
        ))}
      </>
    </GridTable>
  );
};

export default ProductionsTable;
