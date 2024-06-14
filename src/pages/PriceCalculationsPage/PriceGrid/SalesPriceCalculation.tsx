import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import {
  calculateMargin,
  calculateSalesPrice,
} from '../../../app/utils/price/PriceHelper';
import { MAX_MARGIN } from '../../../app/utils/constant';
import { numToThousandSeparatedsStr, roundUp } from '../../../app/utils/common';
import PriceGridInput from './PriceGridInput';
import IncludeSalesPrice from './IncludeSalesPrice';

type Props = {
  enableEdit: boolean;
  salesPriceId: string;
  calculation: PriceCalculationDto;
  price: PriceDto;
  salesPrice: number;
  margin: number;
  onCalculationChange: (
    newMargin: number,
    newSalesPrice: number,
    salesPriceId: string
  ) => void;
};

const SalesPriceCalculation = ({
  price,
  salesPriceId,
  calculation,
  enableEdit,
  margin,
  salesPrice,
  onCalculationChange,
}: Props) => {
  const changeMargin = (newMargin: number) => {
    const newSalesPrice = calculateSalesPrice(
      price.cost ?? 0,
      calculation.freightIncluded ?? 0,
      newMargin
    );

    onCalculationChange(newMargin, newSalesPrice ?? 0, salesPriceId);
  };

  const changeSalesPrice = (newPrice: number) => {
    const newMargin = calculateMargin(
      newPrice,
      price.cost ?? 0,
      calculation.freightIncluded ?? 0
    );

    onCalculationChange(newMargin ?? 0, newPrice, salesPriceId);
  };

  return (
    <>
      <GridTd>
        {numToThousandSeparatedsStr(
          roundUp(price.cost, calculation?.currency?.costDecimals)
        )}
      </GridTd>
      <GridTd>
        <>
          {enableEdit ? (
            <PriceGridInput
              onChange={changeMargin}
              value={margin}
              max={MAX_MARGIN}
            />
          ) : (
            <>
              {numToThousandSeparatedsStr(
                roundUp(margin, calculation?.currency?.marginDecimals)
              )}
            </>
          )}
        </>
      </GridTd>
      <GridTd>
        <>
          {enableEdit ? (
            <PriceGridInput
              onChange={changeSalesPrice}
              value={salesPrice}
              min={0}
            />
          ) : (
            <>
              {numToThousandSeparatedsStr(
                roundUp(salesPrice, calculation?.currency?.salesDecimals)
              )}
            </>
          )}
        </>
      </GridTd>
      <GridTd
        onClick={e => {
          e.stopPropagation();
        }}>
        {price.salesPriceId && (
          <IncludeSalesPrice
            salesPriceId={price.salesPriceId}
            valid={price.valid ?? false}
            included={price.included ?? false}
          />
        )}
      </GridTd>
    </>
  );
};

export default SalesPriceCalculation;
