import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';
import TextArea from '../../../components/Form/TextArea';
import { useFormContext } from 'react-hook-form';

const GeneralSection = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const options = [
    { label: 'IC001', value: 'IC001' },
    { label: 'IC002', value: 'IC002' },
    { label: 'IC003', value: 'IC003' },
  ];
  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          zIndex={1}
          colSpan={{
            base: 12,
            lg: 6,
          }}>
          <TextArea
            minHeight="0"
            label={`${t('PD.FormContent.Description')}`}
            name={'description'}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 0,
            lg: 6,
          }}></GridItem>
        <GridItem
          zIndex={1}
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          <Select
            options={options}
            name="itemCategoryCode"
            label={`${t('PD.FormContent.ItemCategory')}`}
            defaultValue={options.find(
              o => o.value === getValues('itemCategoryCode')
            )}
            placeholder={`${t('Filter.Select')}`}
          />
        </GridItem>
        <GridItem
          zIndex={1}
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          <Select
            options={options}
            name="productGroupCode"
            label={`${t('PD.FormContent.ProductGroup')}`}
            defaultValue={options.find(
              o => o.value === getValues('productGroupCode')
            )}
            placeholder={`${t('Filter.Select')}`}
          />
        </GridItem>
        <GridItem colSpan={12}>
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.ItemNumber')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'itemNo'}
                registerOptions={{ required: true }}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSales'}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'freightIncluded'}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.SampleQuantity')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'sampleQuantity'}
                registerOptions={{ valueAsNumber: true }}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default GeneralSection;
