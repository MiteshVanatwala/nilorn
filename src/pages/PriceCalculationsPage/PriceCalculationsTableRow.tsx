import { Fragment, ReactElement } from 'react';
import { ProductDevelopmentDeepDto } from '../../app/generate';
import {
  GridInlineTbody,
  GridTd,
} from '../../components/GridTable/GridTableElements';
import ProductDevelopmentCell from '../../components/ProductDevelopment/ProductDevelopmentCell';
import { GridItem, Checkbox, Box } from '@chakra-ui/react';
import { TD_STYLE } from '../../theme/Constants/tableGrid';
import PriceGridRow from './PriceGrid/PriceGridRow';
import {
  GRID_LAYOUT_PRICE,
  GRID_LAYOUT_PRICE_DESKTOP,
  GRID_LAYOUT_SOURCING,
  GRID_LAYOUT_SOURCING_DESKTOP,
  PD_COL_SPAN,
  SOURCING_COL_SPAN,
  VENDOR_ROW_SPAN
} from './PriceCalculationsTable';
import { SelectedPrices } from './PriceCalculationsTable';

type Props = {
  productDevelopment: ProductDevelopmentDeepDto;
  selectedPrices: SelectedPrices;
  setSelectedPrices: React.Dispatch<React.SetStateAction<SelectedPrices>>;
};

const PriceCalculationsTableRow = ({ 
  productDevelopment: p,
  selectedPrices,
  setSelectedPrices
}: Props) => {
  const handleCheckboxChange = (priceCalculationId: string) => {
    console.log('Checkbox clicked for priceCalculationId:', priceCalculationId);
    
    setSelectedPrices((prev: SelectedPrices) => {
      const isChecked = !prev[priceCalculationId];

      if (isChecked) {
        console.log(`Checkbox checked for priceCalculationId: ${priceCalculationId}`);
      }

      return {
        ...prev,
        [priceCalculationId]: isChecked
      };
    });
  };

  const renderCheckboxes = (): ReactElement[] => {
    const checkboxes: ReactElement[] = [];

    p.sourcedProductions?.forEach(s => {
      s.productions?.forEach(production => {
        const priceCalculation = production.priceCalculations?.[0];

        console.log('Production:', production);
        console.log('First priceCalculation:', priceCalculation);
        console.log('Extracted ID:', priceCalculation?.id);

        if (priceCalculation?.id) {
          checkboxes.push(
            <Checkbox
              key={priceCalculation.id}
              isChecked={selectedPrices[priceCalculation.id] || false}
              onChange={() => handleCheckboxChange(priceCalculation.id || "")}
            />
          );
        }
      });
    });

    return checkboxes.length > 0
      ? checkboxes
      : [<span key="no-checkboxes"></span>];
  };

  return (
    <Fragment key={p?.productDevelopmentDataDto?.no}>
      <GridTd colSpan={PD_COL_SPAN}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <ProductDevelopmentCell {...p.productDevelopmentDataDto} />
          <Box mt={2}>{renderCheckboxes()}</Box>
        </Box>
      </GridTd>
      <GridTd>{p.productDevelopmentDataDto?.clientName ?? ''}</GridTd>
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
