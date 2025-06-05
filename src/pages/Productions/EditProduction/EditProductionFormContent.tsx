import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import InputField from '../../../components/Form/InputField';
import { GRID, SPACE } from '../../../theme/Constants';
import TextArea from '../../../components/Form/TextArea';
import Select from '../../../components/Form/Select';
import QuantityPurchase from '../QuantityPurchase';
import {
  ProductDevelopmentDataDto,
  ProductionDto,
  ProductionExtendedDto,
  SourcedProductionDto,
  VendorDto,
} from '../../../app/generate';

import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
import { useGetCurrenciesFilterOption } from '../../../app/api/currency';
import { isClosed } from '../../../app/utils/status';
import { useProductionsChangelog } from '../../../app/hooks/useChangelog';
import FormattedNumberInputField from '../../../components/Form/FormattedNumberInputField';
import RangeNumberInputField from '../../../components/Form/RangeNumberInputField';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  sourcedProduction?: SourcedProductionDto;
  createNew?: boolean;
  production?: ProductionDto | ProductionExtendedDto;
  disableEdit?: boolean;
  showChanges: boolean;
};

const EditProductionFormContent = ({
  productDevelopment,
  sourcedProduction,
  createNew,
  production,
  disableEdit = false,
  showChanges,
}: Props) => {
  const { t } = useTranslation();

  const { data: vendors } = useGetVendors(!createNew);
  const { data: currencies } = useGetCurrenciesFilterOption();
  const [selectedVendor, setSelectedVendor] = useState<VendorDto>();

  const newSelctedVendor = useWatch({ name: 'vendorId' });
  const { setValue } = useFormContext();
  const currencyCodeChangelog = useProductionsChangelog(
    'CurrencyCode',
    production?.id ?? ''
  );

  useEffect(() => {
    if (createNew && newSelctedVendor) {
      setSelectedVendor(vendors?.find(co => co.id === newSelctedVendor));
      setValue('currencyCode', selectedVendor?.currencyCode);
    } else {
      setSelectedVendor(vendors?.find(co => co.id === production?.vendorId));
    }
  }, [
    createNew,
    newSelctedVendor,
    production?.vendorId,
    selectedVendor,
    setValue,
    vendors,
  ]);

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.sm,
      }}
      gap={{
        base: SPACE.XXS,
        md: SPACE.MD,
        lg: SPACE.LG,
      }}>
      <GridItem gap={GRID.GAP}>
        <Grid
          gap={GRID.GAP}
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            md: GRID.TEMPLATE_COLUMNS.sm,
            lg: 'repeat(3, 1fr)',
          }}>
          {createNew && vendors?.length && (
            <GridItem maxW={'17.4rem'} colSpan={1}>
              <Select
                registerOptions={{ required: true }}
                label={t('Production.ChooseVendor')}
                options={mapVendorsToOptions(
                  vendors.filter(
                    vendor =>
                      !sourcedProduction?.productions?.some(
                        production => production.vendorId === vendor.id
                      )
                  ),
                  true
                )}
                name={'vendorId'}
              />
            </GridItem>
          )}
          <GridItem colSpan={3}>
            <TextArea
              name="comment"
              placeholder={t('Production.CommentPlaceholder')}
              label={t('Production.Comment')}
              registerOptions={{
                maxLength: 500,
              }}
              readonly={
                productDevelopment?.status
                  ? isClosed(productDevelopment.status)
                  : false
              }
            />
          </GridItem>
          <GridItem colSpan={1}>
            <RangeNumberInputField
              name="sampleLeadTime"
              label={`${t('Production.SL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              readonly={disableEdit}
            />
          </GridItem>
          <GridItem colSpan={1}>
            {
              <RangeNumberInputField
                name="productionLeadTime"
                label={`${t('Production.BL')}`}
                placeholder={`${t('Common.Placeholder')}`}
                readonly={disableEdit}
              />
            }
          </GridItem>
          <GridItem colSpan={1}>
            <FormattedNumberInputField
              name={'moq'}
              label={`${t('Production.MOQ')}`}
              placeholder={`${t('Common.Placeholder')}`}
              readonly={disableEdit}
              type={'integer'}
              min={0}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormattedNumberInputField
              name={'toolCharge'}
              label={`${t('Production.Tool')}`}
              placeholder={`${t('Common.Placeholder')}`}
              readonly={disableEdit}
              type={'integer'}
              min={0}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormattedNumberInputField
              name={'sampleCharge'}
              label={`${t('Production.Sample')}`}
              placeholder={`${t('Common.Placeholder')}`}
              readonly={disableEdit}
              type={'integer'}
              min={0}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Select
              isDisabled={disableEdit}
              key={
                (selectedVendor?.id !== undefined ? selectedVendor?.id : '') +
                currencies?.length +
                currencies?.find(
                  co => co.value === selectedVendor?.currencyCode
                )
              }
              label={`${t('Production.Currency')}`}
              defaultValue={
                createNew
                  ? selectedVendor
                    ? (currencies?.find(
                        co => co.value === selectedVendor?.currencyCode
                      ) as SelectOption)
                    : undefined
                  : (currencies?.find(
                      co => co.value === production?.currencyCode
                    ) as SelectOption)
              }
              options={(currencies as SelectOption[]) ?? []}
              name={'currencyCode'}
              changelog={currencyCodeChangelog}
            />
          </GridItem>
          {!createNew && (
            <InputField
              type="hidden"
              placeholder={`${t('Common.Placeholder')}`}
              name={'vendorId'}
              readonly={disableEdit}
            />
          )}
          <InputField
            type="hidden"
            readonly={disableEdit}
            name={'sourcingId'}
            defaultValue={sourcedProduction?.sourcingId?.toString()}
          />
        </Grid>
      </GridItem>
      <GridItem
        my={{
          base: SPACE.SM,
          lg: '0',
        }}
        gap={{
          base: SPACE.XXS,
          md: SPACE.SM,
        }}>
        <QuantityPurchase disableEdit={disableEdit} showChanges={showChanges} />
      </GridItem>
    </Grid>
  );
};

export default EditProductionFormContent;
