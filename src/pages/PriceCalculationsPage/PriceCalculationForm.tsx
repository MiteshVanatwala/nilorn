import { Grid, GridItem } from '@chakra-ui/react';
import InputField from '../../components/Form/InputField';
import { GRID, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import { useGetCurrencies } from '../../app/api/currency';
import { SelectOption } from '../../app/types/types';

type Props = {
  disableEdit?: boolean;
};

const PriceCalculationForm = ({ disableEdit }: Props) => {
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
            label={`${t('PriceCalc.InternalCommission')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'internalCommission'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="number"
            registerOptions={{ valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.IndirectCostPercent')}`}
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
            readonly={true}
            defaultValue={''}
            label={`${t('PriceCalc.PurchaseCurrency')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'purchaseCurrency'}
          />
        </GridItem>
        <GridItem colStart={1} colSpan={2}>
          <Select
            registerOptions={{ required: true }}
            isDisabled={disableEdit}
            label={`${t('PriceCalc.SalesCurrency')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'currencyCode'}
            options={currency as SelectOption[]}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            type="number"
            registerOptions={{ required: true, valueAsNumber: true }}
            readonly={disableEdit}
            label={`${t('PriceCalc.CurrencyRate')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'currencyRate'}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default PriceCalculationForm;
