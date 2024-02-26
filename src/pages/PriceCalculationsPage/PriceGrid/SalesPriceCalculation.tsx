import { CSSProperties, ChangeEvent, useEffect } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { Input } from '@chakra-ui/react';
import { calculateMargin, calculateSalesPrice } from './PriceHelper';
import { useFormContext } from 'react-hook-form';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';
import { FORM_KEY_SALES_PRICES } from './SalesPriceCalculationForm';

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
  const { setValue, getValues, register, reset } = useFormContext();

  const changeMargin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newSalesPrice = calculateSalesPrice(
      price.cost ?? null,
      calculation.freightIncluded ?? null,
      value
    );
    setValue(`${formKey}.salesPrice`, newSalesPrice);
  };

  const changeSalesPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newMargin = calculateMargin(
      value,
      price.cost ?? null,
      calculation.freightIncluded ?? null
    );
    setValue(`${formKey}.margin`, newMargin);
  };
  useEffect(() => {
    reset({
      [FORM_KEY_SALES_PRICES]: calculation?.priceDtos,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculation.priceDtos]);
  return (
    <>
      <GridTd style={style}>{price.cost}</GridTd>
      <GridTd style={style}>
        <>
          {enableEdit ? (
            <Input
              {...register(`${formKey}.margin`, {
                valueAsNumber: true,
              })}
              onChange={e => changeMargin(e)}
              type="decimal"
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{getValues(`${formKey}.margin`)}</>
          )}
        </>
      </GridTd>
      <GridTd style={style}>{price.cost}</GridTd>
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
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>{getValues(`${formKey}.salesPrice`)}</>
          )}
        </>
      </GridTd>
    </>
  );
};

export default SalesPriceCalculation;
