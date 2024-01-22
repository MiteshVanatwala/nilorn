import { CSSProperties, ChangeEvent } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { Input } from '@chakra-ui/react';
import { calculateMargin, calculateSalesPrice } from './PriceHelper';
import { useFormContext } from 'react-hook-form';

type Props = {
  enableEdit: boolean;
  formKey: string;
  calculation: PriceCalculationDto;
  price: PriceDto;
  style?: CSSProperties;
};

const SalesPriceCalculation = ({
  price,
  calculation,
  style,
  enableEdit,
  formKey,
}: Props) => {
  const { setValue, getValues, register } = useFormContext();

  const changeMargin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newSalesPrice = calculateSalesPrice(
      price.cost ?? 0,
      calculation.freightIncluded ?? 0,
      value
    );
    setValue(`${formKey}.salesPrice`, newSalesPrice);
  };

  const changeSalesPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newMargin = calculateMargin(
      value,
      price.cost ?? 0,
      calculation.freightIncluded ?? 0
    );
    setValue(`${formKey}.margin`, newMargin);
  };

  return (
    <>
      <GridTd style={style}>
        <>
          {enableEdit ? (
            <Input
              {...register(`${formKey}.margin`, {
                valueAsNumber: true,
              })}
              onChange={e => changeMargin(e)}
              min={0}
              max={100}
              type="decimal"
              variant={'outline'}
            />
          ) : (
            <> {getValues(`${formKey}.margin`)}</>
          )}
        </>
      </GridTd>
      <GridTd style={style}>
        <>
          {enableEdit ? (
            <Input
              {...register(`${formKey}.salesPrice`, {
                valueAsNumber: true,
              })}
              onChange={e => changeSalesPrice(e)}
              min={0}
              type="decimal"
              variant={'outline'}
            />
          ) : (
            <>{getValues(`${formKey}.salesPrice`)}</>
          )}
        </>
      </GridTd>
      <GridTd style={style}>{price.cost}</GridTd>
    </>
  );
};

export default SalesPriceCalculation;
