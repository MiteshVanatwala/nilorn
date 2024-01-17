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
import ProductDevelopmentCell from '../Productions/ProductDevelopmentCell';
import PriceGridRow from '../../components/ProductionGrid/PriceGridRow';

type Props = {
  data: ProductDevelopmentDeepDto[];
};

const PriceCalculationsTable = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <GridTable numFr={14}>
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
          {data.map(p => (
            <GridItem colSpan={14}>
              <GridInlineTbody numFr={14}>
                <GridTd colSpan={2}>
                  <ProductDevelopmentCell {...p.productDevelopmentBriefDto} />
                </GridTd>
                <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
                <GridItem colSpan={11}>
                  <GridInlineTbody numFr={11}>
                    <>
                      {p.sourcedProductions?.map((s, index) => (
                        <>
                          <GridTd
                            colSpan={1}
                            key={
                              p?.productDevelopmentBriefDto?.no +
                              '-' +
                              s?.sourcingId
                            }
                            style={TD_STYLE}>
                            <>{s.name}</>
                          </GridTd>
                          <GridItem colSpan={10}>
                            <GridInlineTbody numFr={10}>
                              <>
                                {s.productions?.map(production => (
                                  <PriceGridRow
                                    production={production}
                                    tableMenu={<>Menu</>}
                                  />
                                ))}
                              </>
                            </GridInlineTbody>
                          </GridItem>
                        </>
                      ))}
                    </>
                  </GridInlineTbody>
                </GridItem>
              </GridInlineTbody>
            </GridItem>
          ))}
        </>
      </GridTable>
    </>
  );
};

export default PriceCalculationsTable;
