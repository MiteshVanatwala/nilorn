import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
// import { useFormContext } from 'react-hook-form';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';

const ProductDesignSection = () => {
  // const form = useFormContext();
  const { t } = useTranslation();

  const options = [
    { label: 'hejsan', value: 'hejsan' },
    { label: 'hejsan2', value: 'hejsan2' },
  ];
  return (
    <AccordionItem title={`${t('PD.ProudctDesign')}`}>
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
            name="test"
            label={`${t('PD.Folding')}`}
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
                label={`${t('PD.FinishedLengthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedLength'}
              />
            </GridItem>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
              <InputField
                label={`${t('PD.FinishedWidthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedWidth'}
              />
            </GridItem>
            <GridItem
              mb={{
                base: SPACE.SM,
                lg: '0',
              }}
              colSpan={2}>
              <InputField
                label={`${t('PD.FinishedHeightMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedHeight'}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default ProductDesignSection;
