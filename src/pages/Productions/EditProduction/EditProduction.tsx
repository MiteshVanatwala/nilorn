import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import EditProductionTopSection from './EditProductionTopSection';
import InputField from '../../../components/Form/InputField';
import { GRID, SPACE } from '../../../theme/Constants';
import TextArea from '../../../components/Form/TextArea';
import Select from '../../../components/Form/Select';
import QuantityPurchase from '../QuantityPurchase';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';
import { usePatchProduction } from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  sourcingCoIndex: number;
  createNew?: boolean;
  production?: ProductionDto;
};
const EditProduction = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
  createNew,
  production,
}: Props) => {
  const { t } = useTranslation();
  const form = useForm();
  const vendor = sourcedProduction?.productions
    ? sourcedProduction?.productions[sourcingCoIndex]
    : null;
  const { mutate: saveProduction } = usePatchProduction(
    vendor?.vendorId ?? '',
    vendor?.released ?? false,
    true
  );

  let { data: vendors } = useGetVendors();
  const [vendorOptions, setVendorOptions] = useState<SelectOption[]>([]);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      // updateProductDevelopment(form);
      console.log('save');
      saveProduction(form);
    }
    onSubmit(form);
  }

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <EditProductionTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            vendorIndex={sourcingCoIndex}
            production={production}
            createNew={createNew}
          />
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
                      name={'vendorId'}></Select>
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
                  <InputField
                    label={`Vendor ID`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'vendorId'}
                    // defaultValue={
                    //   sourcedProduction?.productions
                    //     ? sourcedProduction?.productions[
                    //         vendorIndex
                    //       ]?.vendorId?.toString()
                    //     : ''
                    // }
                    defaultValue={'50bb9a63-349f-4c04-6c70-08dc0ba761b0'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`Sourcing ID`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'sourcingId'}
                    // defaultValue={sourcedProduction?.sourcingId?.toString()}
                    defaultValue={'2beaf6e9-118a-4d3f-d08b-08dc11d1f158'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <Select
                    label={`${t('Production.Currency')}`}
                    //TODO add currencies
                    options={[{ value: 'sek', label: 'SEK' }]}
                    name={'CurrencyCode'}></Select>
                </GridItem>
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
                    ? sourcedProduction?.productions[sourcingCoIndex]
                        ?.purchasePrices
                    : undefined
                }
              />
            </GridItem>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default EditProduction;
