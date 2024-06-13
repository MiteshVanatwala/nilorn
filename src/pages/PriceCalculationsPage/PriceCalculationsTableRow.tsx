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
  PD_COL_SPAN,
  SOURCING_COL_SPAN,
  VENDOR_ROW_SPAN,
} from './PriceCalculationsTable';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
};

const PriceCalculationsTableRow = ({ productDevelopment: p }: Props) => {
  return (
    <Fragment key={p?.productDevelopmentDataDto?.no}>
      <GridTd colSpan={PD_COL_SPAN} id={'1'}>
        <ProductDevelopmentCell {...p.productDevelopmentDataDto} />
      </GridTd>
      <GridTd>{p.productDevelopmentDataDto?.clientName ?? ''}</GridTd>
      <GridItem colSpan={VENDOR_ROW_SPAN + SOURCING_COL_SPAN}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_SOURCING,
            lg: GRID_LAYOUT_SOURCING_DESKTOP,
          }}>
          <>
            {p.sourcedProductions?.map(s => (
              <Fragment
                key={p?.productDevelopmentDataDto?.no + '-' + s?.sourcingId}>
                <GridTd
                  colSpan={SOURCING_COL_SPAN}
                  key={p?.productDevelopmentDataDto?.no + '-' + s?.sourcingId}
                  style={TD_STYLE}>
                  <>{s.sourcingCompanyCode}</>
                </GridTd>
                <GridItem colSpan={VENDOR_ROW_SPAN}>
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
                              p?.productDevelopmentDataDto?.no +
                              '-' +
                              s?.sourcingId +
                              '-' +
                              production?.id
                            }
                            production={production}
                            sourcedProduction={s}
                            productDevelopment={p.productDevelopmentDataDto}
                          />
                        ))
                      ) : (
                        <GridTd colSpan={VENDOR_ROW_SPAN}></GridTd>
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
