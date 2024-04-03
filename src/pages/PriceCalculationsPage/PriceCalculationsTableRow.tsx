import { Fragment } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridInlineTbody,
  GridTd,
} from '../../components/GridTable/GridTableElements';
import ProductDevelopmentCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import { GridItem } from '@chakra-ui/react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import PriceGridRow from './PriceGrid/PriceGridRow';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
  GRID_LAYOUT_SOURCING,
  GRID_LAYOUT_SOURCING_DESKTOP,
} from './PriceCalculationsTable';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
};

const PriceCalculationsTableRow = ({ productDevelopment: p }: Props) => {
  return (
    <Fragment key={p?.productDevelopmentBriefDto?.no}>
      <GridTd colSpan={2} id={'1'}>
        <ProductDevelopmentCell {...p.productDevelopmentBriefDto} />
      </GridTd>
      <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
      <GridItem colSpan={11}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_SOURCING,
            lg: GRID_LAYOUT_SOURCING_DESKTOP,
          }}>
          <>
            {p.sourcedProductions?.map(s => (
              <Fragment
                key={p?.productDevelopmentBriefDto?.no + '-' + s?.sourcingId}>
                <GridTd
                  colSpan={1}
                  key={p?.productDevelopmentBriefDto?.no + '-' + s?.sourcingId}
                  style={TD_STYLE}>
                  <>{s.sourcingCompanyCode}</>
                </GridTd>
                <GridItem colSpan={10}>
                  <GridInlineTbody
                    gridTemplateColumns={{
                      base: GRID_LAYOUT_PRICE,
                      lg: GRID_LAYOUT_PRICE_DESKTOP,
                    }}>
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
                            sourcedProduction={s}
                            productDevelopment={p.productDevelopmentBriefDto}
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
  );
};

export default PriceCalculationsTableRow;
