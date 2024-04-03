import { Fragment } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridInlineTbody,
  GridTd,
} from '../../components/GridTable/GridTableElements';
import PDCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import { GridItem } from '@chakra-ui/react';
import {
  GRID_LAYOUT_PRODUCTION,
  GRID_LAYOUT_PRODUCTION_DESKTOP,
  GRID_LAYOUT_SOURCING,
  GRID_LAYOUT_SOURCING_DESKTOP,
} from './ProductionsTable';
import { TD_STYLE, TD_STYLE_RELEASED } from '../../theme/Constants/tableGrid';
import TableMenuContainer from '../../components/Table/TableMenuContainer';
import ProductionGridRow from '../../components/ProductionGrid/ProductionGridRow';
import TableMenuProduction from './TableMenuProduction';
import TableMenuSourcing from './TableMenuSourcing';
import { isClosed } from '../../app/utils/status';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
};

const ProductionsTableRow = ({ productDevelopment: p }: Props) => {
  return (
    <Fragment key={p?.productDevelopmentBriefDto?.no}>
      <GridTd colSpan={2}>
        <PDCell {...p.productDevelopmentBriefDto} />
      </GridTd>
      <GridTd>{p.productDevelopmentBriefDto?.client ?? ''}</GridTd>
      <GridItem colSpan={7}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_SOURCING,
            lg: GRID_LAYOUT_SOURCING_DESKTOP,
          }}>
          {p.sourcedProductions?.map((s, index) => (
            <>
              <GridTd
                key={p?.productDevelopmentBriefDto?.no + '-' + s?.sourcingId}
                style={TD_STYLE}>
                <>
                  {s.sourcingCompanyCode}
                  {p.productDevelopmentBriefDto?.status &&
                    !isClosed(p.productDevelopmentBriefDto.status) && (
                      <TableMenuContainer
                        children={
                          <TableMenuSourcing
                            productDevelopment={p?.productDevelopmentBriefDto}
                            sourcedProduction={s}
                            sourcingCoIndex={index}
                          />
                        }
                      />
                    )}
                </>
              </GridTd>
              <GridItem
                colSpan={6}
                style={s.productions?.length === 0 ? TD_STYLE : undefined}>
                <GridInlineTbody
                  gridTemplateColumns={{
                    base: GRID_LAYOUT_PRODUCTION,
                    lg: GRID_LAYOUT_PRODUCTION_DESKTOP,
                  }}>
                  {s.productions?.map(production => (
                    <ProductionGridRow
                      key={production?.id}
                      production={production}
                      style={
                        production?.released ? TD_STYLE_RELEASED : TD_STYLE
                      }
                      tableMenu={
                        <TableMenuContainer
                          children={
                            <TableMenuProduction
                              productDevelopment={p?.productDevelopmentBriefDto}
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
  );
};

export default ProductionsTableRow;
