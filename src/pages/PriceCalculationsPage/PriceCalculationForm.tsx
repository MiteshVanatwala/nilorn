import { Grid, GridItem } from '@chakra-ui/react';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import { useGetCurrenciesFilterOption } from '../../app/api/currency';
import { SelectOption } from '../../app/types/types';
import { CurrencyDto, PriceCalculationDto, PriceDto } from '../../app/generate';
import { useCalculationChangelog } from '../../app/hooks/useChangelog';
import PriceCalculationFormTable from './PriceCalculationFormTable';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { MAX_MARGIN } from '../../app/utils/constant';
import {
  calculateCost,
  calculateSalesPrice,
} from '../../app/utils/price/PriceHelper';
import FormattedNumberInputField from '../../components/Form/FormattedNumberInputField';

type Props = {
  disableEdit?: boolean;
  calculation: PriceCalculationDto | undefined;
  createNew: boolean;
  showChanges: boolean;
  currency?: CurrencyDto;
  productionId?: string;
  isBulkEdit?: boolean;
  purchaseCurrencyPlaceholder?: string;
  currencyRatePlaceholder?: string;
  internalCommissionPlaceholder?: string;
  indirectCostPlaceholder?: string;
  freightIncludedPlaceholder?: string;
  marginPlaceholder?: string;
};

const PriceCalculationForm = ({
  disableEdit,
  calculation,
  createNew,
  showChanges,
  currency,
  productionId,
  isBulkEdit = false,
  purchaseCurrencyPlaceholder,
  currencyRatePlaceholder,
  internalCommissionPlaceholder,
  indirectCostPlaceholder,
  freightIncludedPlaceholder,
  marginPlaceholder,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  let { data: currencies } = useGetCurrenciesFilterOption();

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
    'InternalCommission',
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
  const currencyRate = currencyRateValue ? Number(currencyRateValue) : 0;
  const internalCommission = internalCommisionValue
    ? Number(internalCommisionValue)
    : 0;

  const indirectCost = indirectCostValue ? Number(indirectCostValue) : 0;

  useEffect(() => {
    let updatedItems: PriceDto[] = [];

    calculationItems?.forEach(item => {
      const initItemMargin =
        calculation?.priceDtos?.find(
          pd => pd.salesPriceId === item.salesPriceId
        )?.margin ?? 0;
      const updatedCost = calculateCost(item.purchasePrice ?? 0, {
        internalCommission,
        currencyRate,
        indirectCost,
      });
      const salesPrice = calculateSalesPrice(
        updatedCost ?? 0,
        freightIncluded,
        margin !== null ? margin : initItemMargin
      );

      updatedItems.push({
        ...item,
        salesPrice,
        margin: margin !== null ? margin : initItemMargin,
        cost: updatedCost,
      });
    });
    setCalculationItems(updatedItems ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    freightIncludedValue,
    marginValue,
    currencyRateValue,
    internalCommisionValue,
    indirectCostValue,
    calculation?.priceDtos,
  ]);

  useEffect(() => {
    if (margin && margin > MAX_MARGIN) {
      setValue('margin', MAX_MARGIN);
    }
  }, [margin, setValue]);

  useEffect(() => {
    if (currency?.code) {
      setValue('currencyCode', currency.code);
    }
  }, [currency?.code, setValue]);

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
          <FormattedNumberInputField
            name={'internalCommission'}
            label={`${
              t('PriceCalc.InternalCommission') + t('PriceCalc.Percentage')
            }`}
            placeholder={
              internalCommissionPlaceholder || t('Common.Placeholder')
            }
            readonly={disableEdit}
            min={0}
            changelog={internalCommissionChangelog}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormattedNumberInputField
            name={'indirectCost'}
            label={`${t('PriceCalc.IndirectCost') + t('PriceCalc.Percentage')}`}
            placeholder={indirectCostPlaceholder || t('Common.Placeholder')}
            readonly={disableEdit}
            min={0}
            changelog={indirectCostChangelog}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormattedNumberInputField
            name={'freightIncluded'}
            label={`${t('PriceCalc.FreightIncluded')}`}
            placeholder={freightIncludedPlaceholder || t('Common.Placeholder')}
            readonly={disableEdit}
            changelog={freightIncludedChangelog}
            min={0}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormattedNumberInputField
            name={'margin'}
            label={`${t('PriceCalc.Margin') + t('PriceCalc.Percentage')}`}
            placeholder={marginPlaceholder || t('Common.Placeholder')}
            readonly={disableEdit}
            required={createNew}
            max={MAX_MARGIN}
            maxMessage={`${t('PriceCalc.Feedback.Error.MarginTooHigh')}`}
          />
        </GridItem>
        <GridItem colStart={1} colSpan={2}>
          <InputField
            readonly={true}
            label={`${t('PriceCalc.PurchaseCurrency')}`}
            name={'purchaseCurrency'}
            placeholder={purchaseCurrencyPlaceholder || t('Common.Placeholder')}
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
            options={currencies as SelectOption[]}
            defaultValue={{ label: currency?.code, value: currency?.code }}
            value={{ label: currency?.code, value: currency?.code }}
            isControlled={isBulkEdit}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormattedNumberInputField
            name={'currencyRate'}
            label={`${t('PriceCalc.CurrencyRate')}`}
            placeholder={currencyRatePlaceholder || t('Common.Placeholder')}
            readonly={disableEdit}
            required={true}
            changelog={currencyRateChangelog}
            min={0}
          />
        </GridItem>
        {createNew && (
          <GridItem colStart={1} colSpan={2}>
            <InputField
              type="hidden"
              readonly={true}
              defaultValue={productionId ?? ''}
              name={'productionId'}
            />
          </GridItem>
        )}
      </Grid>
      {!isBulkEdit && !createNew && (
        <PriceCalculationFormTable
          data={calculationItems ?? []}
          showChanges={showChanges}
        />
      )}
    </>
  );
};

export default PriceCalculationForm;
