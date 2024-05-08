import { ChangeEvent } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { Input } from '@chakra-ui/react';
import {
  calculateMargin,
  calculateSalesPrice,
} from '../../../app/utils/price/PriceHelper';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';
import { MAX_MARGIN, STEP } from '../../../app/utils/constant';
import { roundUp } from '../../../app/utils/common';

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
    let value = Number(e.target.value);
    value = isNaN(value) ? 0 : value;
    const max = Number(e.target.max) || MAX_MARGIN;
    value = Math.min(value, max);

    const newSalesPrice = calculateSalesPrice(
      price.cost ?? 0,
      calculation.freightIncluded ?? 0,
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
      price.cost ?? 0,
      calculation.freightIncluded ?? 0
    );

    onCalculationChange(newMargin ?? 0, value, salesPriceId);
  };

  return (
    <>
      <GridTd>
        {roundUp(price.cost, calculation?.currency?.costDecimals)}
      </GridTd>
      <GridTd>
        <>
          {enableEdit ? (
            <Input
              onChange={changeMargin}
              value={margin ?? 0}
              max={MAX_MARGIN}
              type="number"
              step={STEP}
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{roundUp(margin, calculation?.currency?.marginDecimals)}</>
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
              step={STEP}
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{roundUp(salesPrice, calculation?.currency?.salesDecimals)}</>
          )}
        </>
      </GridTd>
    </>
  );
};

export default SalesPriceCalculation;
