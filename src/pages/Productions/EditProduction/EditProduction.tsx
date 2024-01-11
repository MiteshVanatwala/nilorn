import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import EditProductionTopSection from './EditProductionTopSection';
import InputField from '../../../components/Form/InputField';
import { GRID, SPACE } from '../../../theme/Constants';
import TextArea from '../../../components/Form/TextArea';
import Select from '../../../components/Form/Select';
import QuantityPurchase from '../QuantityPurchase';
import {
  ProductDevelopmentBriefDto,
  SourcedProductionDto,
} from '../../../app/generate';
type Props = {
  productDevelopment: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  vendorIndex: number;
};
const EditProduction = ({
  productDevelopment,
  sourcedProduction,
  vendorIndex,
}: Props) => {
  const { t } = useTranslation();
  const form = useForm();

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form>
          <EditProductionTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            vendorIndex={vendorIndex}
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
                <GridItem colSpan={3}>
                  <TextArea
                    name="comment"
                    placeholder={t('Production.CommentPlaceholder')}
                    label={t('Production.Comment')}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[
                            vendorIndex
                          ]?.comment?.toString()
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.SL')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'SampleLeadTime'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[vendorIndex]
                            ?.sampleLeadTime
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.BL')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'ProductionLeadTime'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[vendorIndex]
                            ?.productionLeadTime
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.MOQ')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'MOQ'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[vendorIndex]?.moq
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.Tool')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'ToolCharge'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[vendorIndex]
                            ?.toolCharge
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.Sample')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'SampleCharge'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[vendorIndex]
                            ?.sampleCharge
                        : ''
                    }
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`Vendor ID`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'vendorId'}
                    defaultValue={
                      sourcedProduction?.productions
                        ? sourcedProduction?.productions[
                            vendorIndex
                          ]?.vendorId?.toString()
                        : ''
                    }
                    // defaultValue={'6eb99b06-d04a-47c4-d086-08dc11d1f158'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`Sourcing ID`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'sourcingId'}
                    defaultValue={sourcedProduction?.sourcingId?.toString()}
                    // defaultValue={'6eb99b06-d04a-47c4-d086-08dc11d1f158'}
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
                    ? sourcedProduction?.productions[vendorIndex]
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
