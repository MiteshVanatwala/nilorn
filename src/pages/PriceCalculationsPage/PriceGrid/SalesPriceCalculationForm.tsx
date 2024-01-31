import { CSSProperties } from 'react';
import { GridInlineTbody } from '../../../components/GridTable/GridTableElements';
import { PriceCalculationDto, PriceDto } from '../../../app/generate';
import { useFieldArray, useFormContext } from 'react-hook-form';
import SalesPriceCalculation from './SalesPriceCalculation';

type Props = {
  enableEdit: boolean;
  calculation: PriceCalculationDto;
  style?: CSSProperties;
};

export const FORM_KEY_SALES_PRICES = 'SalesPrices';

const SalesPriceCalculationForm = ({
  style,
  calculation,
  enableEdit,
}: Props) => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: FORM_KEY_SALES_PRICES,
  });

  return (
    <GridInlineTbody gridTemplateColumns={`repeat(3, 1fr)`}>
      {fields?.map((f, i) => {
        const price = f as PriceDto;
        return (
          <SalesPriceCalculation
            key={calculation?.productionId + '-salesPrice-' + i}
            enableEdit={enableEdit}
            calculation={calculation}
            style={style}
            price={price}
            formKey={`${FORM_KEY_SALES_PRICES}.${i}`}
          />
        );
      })}
    </GridInlineTbody>
  );
};

export default SalesPriceCalculationForm;
