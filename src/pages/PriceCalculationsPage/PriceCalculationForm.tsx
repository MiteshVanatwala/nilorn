import { Grid, GridItem } from '@chakra-ui/react';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import { useGetCurrencies } from '../../app/api/currency';
import { SelectOption } from '../../app/types/types';
import {
  PriceCalculationDto,
  PriceDto,
  ProductionDto,
} from '../../app/generate';
import { useCalculationChangelog } from '../../app/hooks/useChangelog';
import PriceCalculationFormTable from './PriceCalculationFormTable';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { MAX_MARGIN } from '../../app/utils/constant';
import {
  calculateCost,
  calculateSalesPrice,
} from '../../app/utils/price/PriceHelper';

type Props = {
  disableEdit?: boolean;
  calculation: PriceCalculationDto | undefined;
  production: ProductionDto;
  createNew: boolean;
  showChanges: boolean;
  currencyCode?: string;
};

const PriceCalculationForm = ({
  disableEdit,
  calculation,
  production,
  createNew,
  showChanges,
  currencyCode,
}: Props) => {
  const { t } = useTranslation();
  let { data: currency } = useGetCurrencies();
  const [calculationItems, setCalculationItems] = useState<PriceDto[] | null>(
    calculation?.priceDtos ?? null
  );

  useEffect(() => {
    setCalculationItems(calculation?.priceDtos ?? null);
  }, [calculation]);

  const id = calculation?.id ?? '';

  const currencyCodeChangelog = useCalculationChangelog('CurrencyCode', id);
  const currencyRateChangelog = useCalculationChangelog('CurrencyRate', id);
  const freightIncludedChangelog = useCalculationChangelog(
    'FreightIncluded',
    id
  );
  const indirectCostChangelog = useCalculationChangelog('IndirectCost', id);
  const internalCommissionChangelog = useCalculationChangelog(
    'internalCommission',
    id
  );

  const freightIncludedValue = useWatch({ name: 'freightIncluded' });
  const marginValue = useWatch({ name: 'margin' });
  const currencyRateValue = useWatch({ name: 'currencyRate' });
  const internalCommisionValue = useWatch({ name: 'internalCommission' });
  const indirectCostValue = useWatch({ name: 'indirectCost' });

  const freightIncluded = freightIncludedValue
    ? Number(freightIncludedValue)
    : 0;
  const margin = marginValue ? Number(marginValue) : null;
  const currencyRate = currencyRateValue ? Number(currencyRateValue) : 1;
  const internalCommission = internalCommisionValue
    ? Number(internalCommisionValue)
    : 0;
  const indirectCost = indirectCostValue ? Number(indirectCostValue) : 0;

  useEffect(() => {
    let updatedItems: PriceDto[] = [];
    calculationItems?.forEach(item => {
      const updatedCost = calculateCost(item.purchasePrice ?? 0, {
        internalCommission,
        currencyRate,
        indirectCost,
      });
      const salesPrice = calculateSalesPrice(
        updatedCost ?? 0,
        freightIncluded,
        margin ? margin : item.margin ? item.margin : 0
      );
      updatedItems.push({
        ...item,
        salesPrice,
        margin,
        cost: updatedCost,
      });
    });
    setCalculationItems(updatedItems ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freightIncluded, margin, currencyRate, internalCommission, indirectCost]);

  return (
    <>
      <Grid
        templateColumns={{
          base: GRID.TEMPLATE_COLUMNS.base,
          md: GRID.TEMPLATE_COLUMNS.lg,
        }}
        gap={{
          base: SPACE.XXS,
          md: SPACE.MD,
          lg: SPACE.LG,
        }}>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{
              valueAsNumber: true,
              min: {
                value: 0,
                message: `${t('PriceCalc.Feedback.Error.MinToLow')}`,
              },
            }}
            readonly={disableEdit}
            label={`${
              t('PriceCalc.InternalCommission') + t('PriceCalc.Percentage')
            }`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'internalCommission'}
            changelog={internalCommissionChangelog}
            min={0}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{
              valueAsNumber: true,
              min: {
                value: 0,
                message: `${t('PriceCalc.Feedback.Error.MinToLow')}`,
              },
            }}
            readonly={disableEdit}
            label={`${t('PriceCalc.IndirectCost') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'indirectCost'}
            changelog={indirectCostChangelog}
            min={0}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.FreightIncluded')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'freightIncluded'}
            changelog={freightIncludedChangelog}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            registerOptions={{
              valueAsNumber: true,
              required: createNew,
              max: {
                value: MAX_MARGIN,
                message: `${t('PriceCalc.Feedback.Error.MarginTooHigh')}`,
              },
            }}
            label={`${t('PriceCalc.Margin') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'margin'}
            type={'decimal'}
            readonly={disableEdit}
            max={MAX_MARGIN}
          />
        </GridItem>
        <GridItem colStart={1} colSpan={2}>
          <InputField
            readonly={true}
            defaultValue={production.currencyCode ?? ''}
            label={`${t('PriceCalc.PurchaseCurrency')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'purchaseCurrency'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            registerOptions={{ required: true }}
            isDisabled={disableEdit}
            label={`${t('PriceCalc.SalesCurrency')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'currencyCode'}
            changelog={currencyCodeChangelog}
            options={currency as SelectOption[]}
            defaultValue={
              currencyCode
                ? (currency as SelectOption[])?.find(
                    o => o.value === currencyCode
                  )
                : undefined
            }
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{ required: true, valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.CurrencyRate')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'currencyRate'}
            changelog={currencyRateChangelog}
          />
        </GridItem>
        {createNew && (
          <GridItem colStart={1} colSpan={2}>
            <InputField
              type="hidden"
              readonly={true}
              defaultValue={production.id ?? ''}
              name={'productionId'}
            />
          </GridItem>
        )}
      </Grid>
      <PriceCalculationFormTable
        data={calculationItems ?? []}
        showChanges={showChanges}
      />
    </>
  );
};

export default PriceCalculationForm;
