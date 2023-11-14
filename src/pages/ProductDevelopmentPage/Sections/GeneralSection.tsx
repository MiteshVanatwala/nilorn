import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
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
      <Grid
        gap={{
          base: SPACE.XXS,
          lg: SPACE.MD,
        }}
        templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          mb={{
            base: SPACE.SM,
            lg: SPACE.XS,
          }}
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
          mb={{
            base: SPACE.SM,
            lg: '0',
          }}
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
          <Grid
            gap={{
              base: SPACE.XXS,
              lg: SPACE.MD,
            }}
            templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
              <InputField
                label={`${t('PD.ItemNumber')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'itemNumber'}
              />
            </GridItem>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
              <InputField
                label={`${t('PD.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSales'}
              />
            </GridItem>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
              <InputField
                label={`${t('PD.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'freightIncluded'}
              />
            </GridItem>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
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
