import { ChangeEvent } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { Input } from '@chakra-ui/react';
import { calculateMargin, calculateSalesPrice } from './PriceHelper';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';

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

const MAX_MARGIN = 99.99;

const SalesPriceCalculation = ({
  price,
  salesPriceId,
  calculation,
  enableEdit,
  margin,
  salesPrice,
  onCalculationChange,
}: Props) => {
  const changeMargin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = isNaN(value) ? 0 : value;
    const max = Number(e.target.max) || MAX_MARGIN;
    value = Math.min(value, max);

    const newSalesPrice = calculateSalesPrice(
      price.cost ?? null,
      calculation.freightIncluded ?? null,
      value
    );
    onCalculationChange(value, newSalesPrice ?? 0, salesPriceId);
  };

  const changeSalesPrice = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = isNaN(value) ? 0 : value;
    const min = Number(e.target.min) || 0;
    value = Math.max(value, min);

    const newMargin = calculateMargin(
      value,
      price.cost ?? null,
      calculation.freightIncluded ?? null
    );

    onCalculationChange(newMargin ?? 0, value, salesPriceId);
  };

  return (
    <>
      <GridTd>{price.cost}</GridTd>
      <GridTd>
        <>
          {enableEdit ? (
            <Input
              onChange={changeMargin}
              value={margin ?? 0}
              max={MAX_MARGIN}
              type="number"
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{margin}</>
          )}
        </>
      </GridTd>
      <GridTd>
        <>
          {enableEdit ? (
            <Input
              onChange={changeSalesPrice}
              value={salesPrice ?? 0}
              min={0}
              type="number"
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{salesPrice}</>
          )}
        </>
      </GridTd>
    </>
  );
};

export default SalesPriceCalculation;
