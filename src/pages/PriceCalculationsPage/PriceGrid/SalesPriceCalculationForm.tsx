import { CSSProperties } from 'react';
import { GridTd } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import SalesPriceCalculation from './SalesPriceCalculation';
import { PRICE_ROW_SPAN } from '../PriceCalculationsTable';

type Props = {
  enableEdit: boolean;
  calculation: PriceCalculationDto;
  style?: CSSProperties;
  priceData: PriceDto[];
  onCalculationChange: (
    isValid: boolean,
    newMargin: number,
    newSalesPrice: number,
    id: string
  ) => void;
  disableEdit?: boolean;
};

const SalesPriceCalculationForm = ({
  calculation,
  enableEdit,
  onCalculationChange,
  priceData,
  disableEdit = false,
}: Props) => {
  return (
    <>
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
              disableEdit={disableEdit}
            />
          );
        }
        return (
          <GridTd
            key={calculation?.productionId + '-salesPrice-' + i + price.margin}
            colSpan={PRICE_ROW_SPAN}></GridTd>
        );
      })}
    </>
  );
};

export default SalesPriceCalculationForm;
