import { CSSProperties, ChangeEvent } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { Input } from '@chakra-ui/react';
import { calculateMargin, calculateSalesPrice } from './PriceHelper';
import { BORDER_RADIUS, SPACE } from '../../../theme/Constants';

type Props = {
  enableEdit: boolean;
  formKey: string;
  calculation: PriceCalculationDto;
  price: PriceDto;
  style?: CSSProperties;
  // TODO: Pass values to parent
  margin?: number;
  salesPrice?: number;
  //
  index: number;
  // onMarginChange: (value: number, index: number) => void;
  // onSalesPriceChange: (value: number, index: number) => void;
  onChange: (newMargin: number, newSalesPrice: number, index: number) => void;
};

// TODO: move logic up one step?
const SalesPriceCalculation = ({
  price,
  calculation,
  style,
  enableEdit,
  margin,
  salesPrice,
  formKey,

  index,
  // onMarginChange,
  // onSalesPriceChange,
  onChange,
}: Props) => {
  // const { setValue, getValues, register, reset } = useFormContext();

  // TODO: on Cancel show old walue.
  // TODO: Get values from parent?
  // const [margin, setMargin] = useState<number | null>(price.margin ?? null);
  // const [salesPrice, setSalesPrice] = useState<number | null>(
  //   price.salesPrice ?? null
  // );

  const changeMargin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const newSalesPrice = calculateSalesPrice(
      price.cost ?? null,
      calculation.freightIncluded ?? null,
      value
    );
    // setValue(`${formKey}.salesPrice`, newSalesPrice);
    // onMarginChange()
    console.log('changeMargin');
    // onMarginChange(value ?? 0, index); // TODO: handle null
    // onSalesPriceChange(newSalesPrice ?? 0, index); // TODO: handle null

    // setMargin(value);
    // setSalesPrice(newSalesPrice);
    onChange(value, newSalesPrice ?? 0, index);
  };

  const changeSalesPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newMargin = calculateMargin(
      value,
      price.cost ?? null,
      calculation.freightIncluded ?? null
    );

    onChange(newMargin ?? 0, value, index);

    // setValue(`${formKey}.margin`, newMargin);

    // setSalesPrice(value);
    // setMargin(newMargin);
    // onMarginChange(newMargin ?? 0, index); // TODO: handle null
    // onSalesPriceChange(value ?? 0, index); // TODO: handle null
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [calculation.priceDtos]);
  // useEffect(() => {
  //   reset({
  //     [FORM_KEY_SALES_PRICES]: calculation?.priceDtos,
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [calculation.priceDtos]);

  return (
    <>
      <GridTd style={style}>{price.cost}</GridTd>
      <GridTd style={style}>
        <>
          {enableEdit ? (
            <Input
              // {...register(`${formKey}.margin`, {
              //   valueAsNumber: true,
              // })}
              // onChange={e => changeMargin(e)}
              onChange={changeMargin}
              value={margin ?? 0}
              type="number"
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>
              {price.margin}
              {/* {getValues(`${formKey}.margin`)} */}
            </>
          )}
        </>
      </GridTd>
      <GridTd style={style}>
        <>
          {enableEdit ? (
            <Input
              // {...register(`${formKey}.salesPrice`, {
              //   valueAsNumber: true,
              // })}
              // onChange={e => changeSalesPrice(e)}
              onChange={changeSalesPrice}
              value={salesPrice ?? 0}
              // min={0}
              type="number"
              variant={'outline'}
              my={SPACE.XXS}
              borderRadius={BORDER_RADIUS.XS}
            />
          ) : (
            <>
              {price.salesPrice}
              {/* {getValues(`${formKey}.salesPrice`)} */}
            </>
          )}
        </>
      </GridTd>
    </>
  );
};

export default SalesPriceCalculation;
