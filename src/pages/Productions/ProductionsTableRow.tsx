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
import { useFormStateFilters } from '../../app/hooks/useFormStateFilters';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
};

const ProductionsTableRow = ({ productDevelopment: p }: Props) => {
  const filters = useFormStateFilters();
  return (
    <Fragment>
      <GridTd colSpan={2}>
        <PDCell {...p.productDevelopmentDataDto} />
      </GridTd>
      <GridTd>{p.productDevelopmentDataDto?.clientName ?? ''}</GridTd>
      <GridItem colSpan={7}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_SOURCING,
            lg: GRID_LAYOUT_SOURCING_DESKTOP,
          }}>
          {p.sourcedProductions?.map((s, index) => (
            <Fragment key={`sourcedProductions_${s.sourcingId}_${index}`}>
              <GridTd
                key={p?.productDevelopmentDataDto?.no + '-' + s?.sourcingId}
                style={TD_STYLE}>
                <>
                  {s.sourcingCompanyCode}
                  {p.productDevelopmentDataDto?.status &&
                    !isClosed(p.productDevelopmentDataDto.status) && (
                      <TableMenuContainer
                        children={
                          <TableMenuSourcing
                            productDevelopment={p?.productDevelopmentDataDto}
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
                              productDevelopment={p?.productDevelopmentDataDto}
                              production={production}
                              filters={filters}
                            />
                          }
                        />
                      }
                    />
                  ))}
                </GridInlineTbody>
              </GridItem>
            </Fragment>
          ))}
        </GridInlineTbody>
      </GridItem>
    </Fragment>
  );
};

export default ProductionsTableRow;
