import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';

const GeneralSection = () => {
  const { t } = useTranslation();

  const options = [
    { label: 'hejsan', value: 'hejsan' },
    { label: 'hejsan2', value: 'hejsan2' },
  ];
  return (
    <AccordionItem title={`${t('PD.General')}`}>
      <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          zIndex={1}
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          <Select
            options={options}
            name="itemCategory"
            label={`${t('PD.ItemCategory')}`}
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
            name="productGroup"
            label={`${t('PD.ProductGroup')}`}
            placeholder={`${t('Filter.Select')}`}
          />
        </GridItem>
        <GridItem colSpan={12}>
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.ItemNumber')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'itemNumber'}
                registerOptions={{ required: true }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSales'}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'freightIncluded'}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.SampleQuantity')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'sampleQuantity'}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default GeneralSection;
