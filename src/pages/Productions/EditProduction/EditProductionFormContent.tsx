import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import InputField from '../../../components/Form/InputField';
import { GRID, SPACE } from '../../../theme/Constants';
import TextArea from '../../../components/Form/TextArea';
import Select from '../../../components/Form/Select';
import QuantityPurchase from '../QuantityPurchase';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
  VendorDto,
} from '../../../app/generate';

import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
import { useGetCurrencies } from '../../../app/api/currency';
import { isClosed } from '../../../app/utils/status';
import { useProductionsChangelog } from '../../../app/hooks/useChangelog';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  createNew?: boolean;
  production?: ProductionDto;
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

  let { data: vendors } = useGetVendors(!createNew);
  let { data: currency } = useGetCurrencies();
  const [selectedVendor, setSelectedVendor] = useState<VendorDto>();

  const [vendorOptions, setVendorOptions] = useState<SelectOption[]>([]);
  const newSelctedVendor = useWatch({ name: 'vendorId' });
  const { setValue } = useFormContext();
  const currencyCodeChangelog = useProductionsChangelog(
    'CurrencyCode',
    production?.id ?? ''
  );

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors, true));
    }
  }, [vendors]);

  useEffect(() => {
    if (createNew && newSelctedVendor) {
      setSelectedVendor(vendors?.find(co => co.id === newSelctedVendor));
    } else {
      setSelectedVendor(vendors?.find(co => co.id === production?.vendorId));
    }
  }, [
    createNew,
    newSelctedVendor,
    production?.vendorId,
    selectedVendor,
    vendors,
  ]);
  useEffect(() => {
    if (selectedVendor) {
      setValue('currencyCode', selectedVendor?.currencyCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVendor]);
  useEffect(() => {
    if (createNew) {
      setValue('released', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createNew]);
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
          {createNew && (
            <GridItem maxW={'17.4rem'} colSpan={1}>
              <Select
                registerOptions={{ required: true }}
                label={t('Production.ChooseVendor')}
                options={vendorOptions ?? []}
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
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              readonly={disableEdit}
              label={`${t('Production.SL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'sampleLeadTime'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              readonly={disableEdit}
              label={`${t('Production.BL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'productionLeadTime'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              readonly={disableEdit}
              label={`${t('Production.MOQ')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'moq'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              readonly={disableEdit}
              label={`${t('Production.Tool')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'toolCharge'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              readonly={disableEdit}
              label={`${t('Production.Sample')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'sampleCharge'}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Select
              isDisabled={disableEdit}
              key={
                (selectedVendor?.id !== undefined ? selectedVendor?.id : '') +
                currency?.length +
                currency?.find(co => co.value === selectedVendor?.currencyCode)
              }
              label={`${t('Production.Currency')}`}
              defaultValue={
                selectedVendor
                  ? (currency?.find(
                      co => co.value === selectedVendor?.currencyCode
                    ) as SelectOption)
                  : undefined
              }
              options={(currency as SelectOption[]) ?? []}
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
          <InputField type="hidden" name={'released'} />
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
