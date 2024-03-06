import { CSSProperties } from 'react';
import {
  GridInlineTbody,
  GridTd,
} from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import SalesPriceCalculation from './SalesPriceCalculation';

type Props = {
  enableEdit: boolean;
  calculation: PriceCalculationDto;
  style?: CSSProperties;
  priceData: PriceDto[];
  onCalculationChange: (
    newMargin: number,
    newSalesPrice: number,
    id: string
  ) => void;
};

export const FORM_KEY_SALES_PRICES = 'SalesPrices';

const SalesPriceCalculationForm = ({
  style,
  calculation,
  enableEdit,
  onCalculationChange,
  priceData,
}: Props) => {
  return (
    <GridInlineTbody gridTemplateColumns={`repeat(3, 1fr)`}>
      {calculation.priceDtos?.map((f, i) => {
        const price = f as PriceDto;
        if (!!f.salesPriceId) {
          return (
            <SalesPriceCalculation
              key={
                calculation?.productionId + '-salesPrice-' + i + price.margin
              }
              salesPriceId={`${f.salesPriceId}`}
              enableEdit={enableEdit}
              calculation={calculation}
              price={price}
              margin={priceData[i].margin ?? 0}
              salesPrice={priceData[i].salesPrice ?? 0}
              onCalculationChange={onCalculationChange}
            />
          );
        }
        return (
          <GridTd
            key={calculation?.productionId + '-salesPrice-' + i + price.margin}
            colSpan={3}></GridTd>
        );
      })}
    </GridInlineTbody>
  );
};

export default SalesPriceCalculationForm;
