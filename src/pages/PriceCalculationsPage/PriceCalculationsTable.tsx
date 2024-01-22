import { GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import {
  GridInlineTbody,
  GridTd,
  GridTh,
  GridTable,
} from '../../components/GridTable/GridTableElements';
import ProductDevelopmentCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import PriceGridRow from './PriceGrid/PriceGridRow';
import { Fragment } from 'react';
import TableMenuCalculation from './PriceGrid/TableMenuCalculation';

const GRID_LAYOUT =
  'repeat(6, 1fr) [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';
const GRID_LAYOUT_SOURCING =
  'repeat(3, 1fr) [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';
export const GRID_LAYOUT_PRICE =
  'repeat(2, 1fr) [BaseValues] minmax(150px, 1fr) repeat(7, 1fr)';

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <GridTable gridTemplateColumns={GRID_LAYOUT}>
        <GridTh colSpan={2}>{t('Production.ProductDevelopments')}</GridTh>
        <GridTh>{t('PD.Client')}</GridTh>
        <GridTh>{t('PD.SourcingCompany')}</GridTh>
        <GridTh>{t('PD.AccordionLabels.Vendor')}</GridTh>
        <GridTh>{t('Production.Comment')}</GridTh>
        <GridTh>{t('PriceCalc.BaseValues')}</GridTh>
        <GridTh>{t('PriceCalc.Net')}</GridTh>
        <GridTh>{t('Production.Qty')}</GridTh>
        <GridTh>{t('PriceCalc.PurCurr')}</GridTh>
        <GridTh>{t('PriceCalc.SalesCurr')}</GridTh>
        <GridTh>{t('PriceCalc.Margin')}</GridTh>
        <GridTh>{t('PriceCalc.Sales')}</GridTh>
        <GridTh>{t('PriceCalc.Cost')}</GridTh>
        <>
          {data.map((p, i) => (
            <Fragment key={p?.productDevelopmentBriefDto?.no}>
              <GridTd colSpan={2}>
                <ProductDevelopmentCell {...p.productDevelopmentBriefDto} />
              </GridTd>
              <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
              <GridItem colSpan={11}>
                <GridInlineTbody gridTemplateColumns={GRID_LAYOUT_SOURCING}>
                  <>
                    {p.sourcedProductions?.map(s => (
                      <Fragment
                        key={
                          p?.productDevelopmentBriefDto?.no +
                          '-' +
                          s?.sourcingId
                        }>
                        <GridTd
                          colSpan={1}
                          key={
                            p?.productDevelopmentBriefDto?.no +
                            '-' +
                            s?.sourcingId
                          }
                          style={TD_STYLE}>
                          <>{s.sourcingCompanyCode}</>
                        </GridTd>
                        <GridItem colSpan={10}>
                          <GridInlineTbody
                            gridTemplateColumns={GRID_LAYOUT_PRICE}>
                            <>
                              {s.productions && s.productions?.length > 0 ? (
                                s.productions?.map(production => (
                                  <PriceGridRow
                                    key={
                                      p?.productDevelopmentBriefDto?.no +
                                      '-' +
                                      s?.sourcingId +
                                      '-' +
                                      production?.id
                                    }
                                    production={production}
                                    tableMenu={
                                      <TableMenuCalculation
                                        sourcedProduction={s}
                                        productDevelopment={
                                          p?.productDevelopmentBriefDto
                                        }
                                        createNew={
                                          (production?.priceCalculations &&
                                            production?.priceCalculations
                                              ?.length <= 0) ??
                                          true
                                        }
                                      />
                                    }
                                  />
                                ))
                              ) : (
                                <GridTd colSpan={10}></GridTd>
                              )}
                            </>
                          </GridInlineTbody>
                        </GridItem>
                      </Fragment>
                    ))}
                  </>
                </GridInlineTbody>
              </GridItem>
            </Fragment>
          ))}
        </>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
