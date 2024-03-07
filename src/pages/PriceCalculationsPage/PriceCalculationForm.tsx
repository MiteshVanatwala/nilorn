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

type Props = {
  disableEdit?: boolean;
  calculation: PriceCalculationDto | undefined;
  production: ProductionDto;
  createNew: boolean;
  calculationPrice: PriceDto[] | null | undefined;
  showChanges: boolean;
};

const PriceCalculationForm = ({
  disableEdit,
  calculation,
  production,
  createNew,
  calculationPrice,
  showChanges,
}: Props) => {
  const { t } = useTranslation();
  let { data: currency } = useGetCurrencies();

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
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${
              t('PriceCalc.InternalCommission') + t('PriceCalc.Percentage')
            }`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'internalCommission'}
            changelog={internalCommissionChangelog}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.IndirectCost') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'indirectCost'}
            changelog={indirectCostChangelog}
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
          {/** TODO Validate max 99.99 */}
          <InputField
            registerOptions={{
              valueAsNumber: true,
              required: createNew,
            }}
            label={`${t('PriceCalc.Margin') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'margin'}
            type={'decimal'}
            readonly={disableEdit}
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
            key={
              (production?.id !== undefined ? production?.id : '') +
              calculation?.id +
              calculation?.currencyCode +
              currency?.length +
              currency?.find(o => o.value === calculation?.currencyCode)?.value
            }
            registerOptions={{ required: true }}
            isDisabled={disableEdit}
            label={`${t('PriceCalc.SalesCurrency')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'currencyCode'}
            changelog={currencyCodeChangelog}
            options={currency as SelectOption[]}
            defaultValue={
              calculation?.currencyCode
                ? (currency as SelectOption[])?.find(
                    o => o.value === calculation?.currencyCode
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
        data={calculationPrice ?? []}
        showChanges={showChanges}
      />
    </>
  );
};

export default PriceCalculationForm;
