import { Grid, GridItem, Box } from '@chakra-ui/react';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import DistributionCompanySelect from '../../components/Form/DistributionCompanySelect';
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
  currencyCodePlaceholder?: string;
  currencyRatePlaceholder?: string;
  internalCommissionPlaceholder?: string;
  indirectCostPlaceholder?: string;
  freightIncludedPlaceholder?: string;
  marginPlaceholder?: string;
  distributionCompanyPlaceholder?: string;
  distributionCompanyCode?: string | undefined;
  distributionCompanyName?: string | undefined | null;
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
  currencyCodePlaceholder,
  currencyRatePlaceholder,
  internalCommissionPlaceholder,
  indirectCostPlaceholder,
  freightIncludedPlaceholder,
  marginPlaceholder,
  distributionCompanyPlaceholder,
  distributionCompanyCode,
  distributionCompanyName,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  let { data: currencies } = useGetCurrenciesFilterOption();

  const [calculationItems, setCalculationItems] = useState<PriceDto[] | null>(
    calculation?.priceDtos ?? null
  );

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

  useEffect(() => {
    const valueToSet = calculation?.distributionCompanyCode || distributionCompanyCode;
    
    // Only set value if we have one, or if it's required (not bulk edit with placeholder)
    if (valueToSet) {
      console.log('Setting distributionCompany value to:', valueToSet);
      setValue('distributionCompany', valueToSet, { 
        shouldValidate: false,
        shouldDirty: false 
      });
    } else if (!isBulkEdit || !distributionCompanyPlaceholder) {
      console.log('No distributionCompany code available, setting to empty string for validation');
      // For required fields, register with empty value to enable validation
      setValue('distributionCompany', null, { 
        shouldValidate: false,
        shouldDirty: false 
      });
    }
  }, [distributionCompanyCode, calculation?.distributionCompanyCode, setValue, isBulkEdit, distributionCompanyPlaceholder]);
  
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
        }}
      >
        <GridItem colStart={1} colSpan={{ base: 1, md: 1, lg: 10 }}>
          <Box w={{ base: '100%', md: '20%' }} mb={{ base: 4, md: 6 }}>
            <DistributionCompanySelect
              key="distributionCompany"
              name={'distributionCompany'}
              label={`${t('PriceCalc.DistributionCompany')}`}
              registerOptions={{ required: !isBulkEdit || !distributionCompanyPlaceholder }}
              isDisabled={disableEdit}
              placeholder={distributionCompanyPlaceholder}
              defaultValue={
                calculation?.distributionCompanyCode
                  ? {
                      label:
                        calculation?.distributionCompanyName ??
                        calculation?.distributionCompanyCode,
                      value: calculation?.distributionCompanyCode,
                    }
                  : distributionCompanyCode
                  ? {
                      label: distributionCompanyName ?? distributionCompanyCode,
                      value: distributionCompanyCode,
                    }
                  : undefined
              }
            />
          </Box>
        </GridItem>
      </Grid>
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
            registerOptions={{ required: !isBulkEdit || !currencyCodePlaceholder }}
            isDisabled={disableEdit}
            label={`${t('PriceCalc.SalesCurrency')}`}
            placeholder={currencyCodePlaceholder || t('Common.Select')}
            name={'currencyCode'}
            changelog={currencyCodeChangelog}
            options={currencies as SelectOption[]}
            defaultValue={currency?.code ? { label: currency?.code, value: currency?.code } : undefined}
            value={isBulkEdit ? (currency?.code ? { label: currency?.code, value: currency?.code } : null) : undefined}
            isControlled={isBulkEdit}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormattedNumberInputField
            name={'currencyRate'}
            label={`${t('PriceCalc.CurrencyRate')}`}
            placeholder={currencyRatePlaceholder || t('Common.Placeholder')}
            readonly={disableEdit}
            required={!isBulkEdit || !currencyRatePlaceholder}
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
