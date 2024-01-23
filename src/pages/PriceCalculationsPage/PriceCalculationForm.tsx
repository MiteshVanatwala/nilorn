import { Grid, GridItem } from '@chakra-ui/react';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import { useGetCurrencies } from '../../app/api/currency';
import { SelectOption } from '../../app/types/types';
import { PriceCalculationDto, ProductionDto } from '../../app/generate';

type Props = {
  disableEdit?: boolean;
  calculation: PriceCalculationDto | undefined;
  production: ProductionDto;
  createNew: boolean;
};

const PriceCalculationForm = ({
  disableEdit,
  calculation,
  production,
  createNew,
}: Props) => {
  const { t } = useTranslation();
  let { data: currency } = useGetCurrencies();

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
            type="number"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${
              t('PriceCalc.InternalCommission') + t('PriceCalc.Percentage')
            }`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'internalCommission'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="number"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.IndirectCost') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'indirectCost'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="number"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.FreightIncluded')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'freightIncluded'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="decimal"
            registerOptions={{ valueAsNumber: true, required: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.Margin') + t('PriceCalc.Percentage')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'margin'}
          />
        </GridItem>
        {!createNew && (
          <GridItem colStart={1} colSpan={2}>
            <InputField
              readonly={true}
              defaultValue={production.currencyCode ?? ''}
              label={`${t('PriceCalc.PurchaseCurrency')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'purchaseCurrency'}
            />
          </GridItem>
        )}
        <GridItem colStart={createNew ? 1 : 'auto'} colSpan={2}>
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
    </>
  );
};

export default PriceCalculationForm;
