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

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

  useEffect(() => {
    if (createNew && newSelctedVendor) {
      setSelectedVendor(vendors?.find(co => co.no === newSelctedVendor));
    }
  }, [createNew, newSelctedVendor, vendors]);

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
              label={`${t('Production.SL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'SampleLeadTime'}
              defaultValue={production?.sampleLeadTime}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              label={`${t('Production.BL')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'ProductionLeadTime'}
              defaultValue={production?.productionLeadTime}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              label={`${t('Production.MOQ')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'MOQ'}
              defaultValue={production?.moq}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              label={`${t('Production.Tool')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'ToolCharge'}
              defaultValue={production?.toolCharge}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              label={`${t('Production.Sample')}`}
              placeholder={`${t('Common.Placeholder')}`}
              name={'SampleCharge'}
              defaultValue={production?.sampleCharge}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <Select
              key={selectedVendor?.id}
              label={`${t('Production.Currency')}`}
              defaultValue={
                selectedVendor
                  ? (currency?.find(
                      co => co.value === selectedVendor?.currencyCode
                    ) as SelectOption)
                  : undefined
              }
              options={(currency as SelectOption[]) ?? []}
              name={'CurrencyCode'}
            />
          </GridItem>
          <InputField
            type="hidden"
            placeholder={`${t('Common.Placeholder')}`}
            name={'vendorId'}
            defaultValue={selectedVendor?.id}
          />

          <InputField
            type="hidden"
            placeholder={`${t('Common.Placeholder')}`}
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
