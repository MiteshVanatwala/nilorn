import { CSSProperties } from 'react';
import { GridInlineTbody } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import SalesPriceCalculation from './SalesPriceCalculation';

type Props = {
  enableEdit: boolean;
  calculation: PriceCalculationDto;
  style?: CSSProperties;
  data: PriceDto[];
  // onMarginChange: (value: number, index: number) => void; // TODO; index or id
  // onSalesPriceChange: (value: number, index: number) => void;
  onChange: (newMargin: number, newSalesPrice: number, index: number) => void;
};

export const FORM_KEY_SALES_PRICES = 'SalesPrices';

const SalesPriceCalculationForm = ({
  style,
  calculation,
  enableEdit,
  // onMarginChange,
  // onSalesPriceChange,
  onChange,
  data,
}: // onSalesPriceChange,
Props) => {
  // TODO: Log data
  //const [temp, setTemp] = useState();
  return (
    <GridInlineTbody gridTemplateColumns={`repeat(3, 1fr)`}>
      {calculation?.priceDtos?.map((f, i) => {
        const price = f as PriceDto;
        return (
          <SalesPriceCalculation
            key={calculation?.productionId + '-salesPrice-' + i + price.margin}
            enableEdit={enableEdit}
            calculation={calculation}
            style={style}
            price={price}
            index={i}
            onChange={onChange}
            // onMarginChange={onMarginChange}
            // onSalesPriceChange={onSalesPriceChange}
            margin={data[i].margin ?? 0}
            salesPrice={data[i].salesPrice ?? 0}
            formKey={`${FORM_KEY_SALES_PRICES}.${i}`}
          />
        );
      })}
    </GridInlineTbody>
  );
};

export default SalesPriceCalculationForm;
