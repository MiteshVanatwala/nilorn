import { Fragment } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridInlineTbody,
  GridTd,
} from '../../components/GridTable/GridTableElements';
import ProductDevelopmentCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import { GridItem, Box, Tooltip, Text } from '@chakra-ui/react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import PriceGridRow from './PriceGrid/PriceGridRow';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
  GRID_LAYOUT_SOURCING,
  GRID_LAYOUT_SOURCING_DESKTOP,
  PD_COL_SPAN,
  SelectedProduction,
  SOURCING_COL_SPAN,
  VENDOR_ROW_SPAN,
} from './PriceCalculationsTable';
import { SelectedPrices } from './PriceCalculationsTable';
import { SPACE } from '../../theme/Constants';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
  selectedPrices: SelectedPrices;
  setSelectedPrices: React.Dispatch<React.SetStateAction<SelectedPrices>>;
  selectedProduction: SelectedProduction;
  setSelectedProduction: React.Dispatch<React.SetStateAction<SelectedProduction>>;
};

const PriceCalculationsTableRow = ({
  productDevelopment: p,
  selectedPrices,
  setSelectedPrices,
  selectedProduction,
  setSelectedProduction
}: Props) => {
  return (
    <Fragment key={p?.productDevelopmentDataDto?.no}>
      <GridTd
        colSpan={PD_COL_SPAN}
        style={{
          ...TD_STYLE,
          overflow: 'visible',
        }}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <ProductDevelopmentCell {...p.productDevelopmentDataDto} />
        </Box>
      </GridTd>
      <GridTd>
        <Box as="span">
          {p.productDevelopmentDataDto?.clientName ?? ''}
          <Tooltip
            label={
              <Box
                dangerouslySetInnerHTML={{
                  __html: p.productDevelopmentDataDto?.clientRequirement ?? '!',
                }}
              />
            }
            placement="right-start">
            <Text
              color="red"
              ml={SPACE.XXS}
              display="inline-block"
              cursor={'pointer'}>
              <i className="ri-information-line"></i>
            </Text>
          </Tooltip>
        </Box>
      </GridTd>
      <GridItem colSpan={VENDOR_ROW_SPAN + SOURCING_COL_SPAN}>
        <GridInlineTbody
          gridTemplateColumns={{
            base: GRID_LAYOUT_SOURCING,
            lg: GRID_LAYOUT_SOURCING_DESKTOP,
          }}>
          {p.sourcedProductions?.map(s => (
            <Fragment
              key={`${p?.productDevelopmentDataDto?.no}-${s?.sourcingId}`}>
              <GridTd
                colSpan={SOURCING_COL_SPAN}
                key={`${p?.productDevelopmentDataDto?.no}-${s?.sourcingId}`}
                style={TD_STYLE}>
                {s.sourcingCompanyCode}
              </GridTd>
              <GridItem colSpan={VENDOR_ROW_SPAN}>
                <GridInlineTbody
                  gridTemplateColumns={{
                    base: GRID_LAYOUT_PRICE,
                    lg: GRID_LAYOUT_PRICE_DESKTOP,
                  }}>
                  {s.productions && s.productions.length > 0 ? (
                    s.productions.map(production => (
                      <Fragment
                        key={`${p?.productDevelopmentDataDto?.no}-${s?.sourcingId}-${production?.id}`}>
                        <PriceGridRow
                          production={production}
                          sourcedProduction={s}
                          productDevelopment={p.productDevelopmentDataDto}
                          selectedPrices={selectedPrices}
                          setSelectedPrices={setSelectedPrices}
                          selectedProduction={selectedProduction}
                          setSelectedProduction={setSelectedProduction}
                        />
                      </Fragment>
                    ))
                  ) : (
                    <GridTd colSpan={VENDOR_ROW_SPAN} />
                  )}
                </GridInlineTbody>
              </GridItem>
            </Fragment>
          ))}
        </GridInlineTbody>
      </GridItem>
    </Fragment>
  );
};

export default PriceCalculationsTableRow;
