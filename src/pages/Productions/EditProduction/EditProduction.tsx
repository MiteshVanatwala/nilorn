import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import EditProductionTopSection from './EditProductionTopSection';
import InputField from '../../../components/Form/InputField';
import { GRID, SPACE } from '../../../theme/Constants';
import TextArea from '../../../components/Form/TextArea';
import Select from '../../../components/Form/Select';
import QuantityPurchase from '../QuantityPurchase';

const EditProduction = () => {
  const { t } = useTranslation();
  const form = useForm();

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form>
          <EditProductionTopSection productNo="2" />
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
            <GridItem>
              <TextArea
                name="comment"
                placeholder={t('Production.CommentPlaceholder')}
                label={t('Production.Comment')}
              />
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
              <QuantityPurchase />
            </GridItem>
            <GridItem>
              <Grid
                gap={GRID.GAP}
                templateColumns={{
                  base: GRID.TEMPLATE_COLUMNS.base,
                  md: GRID.TEMPLATE_COLUMNS.sm,
                  lg: 'repeat(3, 1fr)',
                }}>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.SL')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'SampleLeadTime'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.BL')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'ProductionLeadTime'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.MOQ')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'MOQ'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.Tool')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'Tool'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <InputField
                    label={`${t('Production.Sample')}`}
                    placeholder={`${t('Common.Placeholder')}`}
                    name={'SampleCharge'}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <Select
                    label={`${t('Production.Currency')}`}
                    //TODO add currencies
                    options={[{ value: 'sek', label: 'SEK' }]}
                    name={'Currency'}></Select>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default EditProduction;
