import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';

const ProductDesignSection = () => {
  const { t } = useTranslation();

  const options = [
    { label: 'hejsan', value: 'hejsan' },
    { label: 'hejsan2', value: 'hejsan2' },
  ];
  return (
    <AccordionItem title={`${t('PD.AccordionLabels.ProductDesign')}`}>
      <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          zIndex={1}
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          <Select
            options={options}
            name="folding"
            label={`${t('PD.FormContent.Folding')}`}
            placeholder={`${t('Filter.Select')}`}
          />
        </GridItem>
        <GridItem colSpan={12}>
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FinishedLengthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedLength'}
                type="number"
                registerOptions={{ valueAsNumber: true }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FinishedWidthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedWidth'}
                type="number"
                registerOptions={{ valueAsNumber: true }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FinishedHeightMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedHeight'}
                type="number"
                registerOptions={{ valueAsNumber: true }}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default ProductDesignSection;
