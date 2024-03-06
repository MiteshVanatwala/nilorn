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
    const value = Number(e.target.value);
    const newSalesPrice = calculateSalesPrice(
      price.cost ?? null,
      calculation.freightIncluded ?? null,
      value
    );
    onCalculationChange(value, newSalesPrice ?? 0, salesPriceId);
  };

  const changeSalesPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
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
              max={99.99999}
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
