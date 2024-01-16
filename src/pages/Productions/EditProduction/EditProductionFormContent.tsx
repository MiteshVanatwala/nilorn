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
type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  sourcingCoIndex: number;
  createNew?: boolean;
  production?: ProductionDto;
};
const EditProductionFormContent = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
  createNew,
  production,
}: Props) => {
  const { t } = useTranslation();

  let { data: vendors } = useGetVendors(!createNew);
  let { data: currency } = useGetCurrencies();
  const [selectedVendor, setSelectedVendor] = useState<VendorDto>();

  const [vendorOptions, setVendorOptions] = useState<SelectOption[]>([]);
  const newSelctedVendor = useWatch({ name: 'vendorId' });
  const { setValue } = useFormContext();

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
    if (production?.released) {
      setValue('released', true);
    } else {
      setValue('released', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [production?.released]);

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
              defaultValue={production?.comment?.toString()}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              label={`${t('Production.SL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'SampleLeadTime'}
              defaultValue={production?.sampleLeadTime}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              label={`${t('Production.BL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'ProductionLeadTime'}
              defaultValue={production?.productionLeadTime}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              label={`${t('Production.MOQ')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'MOQ'}
              defaultValue={production?.moq}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              label={`${t('Production.Tool')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'ToolCharge'}
              defaultValue={production?.toolCharge}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              type="number"
              registerOptions={{ required: true, valueAsNumber: true }}
              label={`${t('Production.Sample')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'SampleCharge'}
              defaultValue={production?.sampleCharge}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Select
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
            />
          </GridItem>
          {!createNew && (
            <InputField
              type="hidden"
              placeholder={`${t('Common.Placeholder')}`}
              name={'vendorId'}
              defaultValue={production?.vendorId?.toString()}
            />
          )}
          <InputField
            type="hidden"
            placeholder={`${t('Common.Placeholder')}`}
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
        <QuantityPurchase
          purchasePrices={
            sourcedProduction?.productions
              ? sourcedProduction?.productions[sourcingCoIndex]?.purchasePrices
              : undefined
          }
        />
      </GridItem>
    </Grid>
  );
};

export default EditProductionFormContent;
