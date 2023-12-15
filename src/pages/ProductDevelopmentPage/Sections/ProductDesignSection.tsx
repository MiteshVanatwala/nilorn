import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';
import { useFormContext } from 'react-hook-form';
import useFilterOptions from '../../../app/hooks/useFilterOption';

const ProductDesignSection = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const foldingTypes = useFilterOptions('foldingTypes');
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
            options={foldingTypes}
            name="foldingTypeCode"
            label={`${t('PD.FormContent.Folding')}`}
            defaultValue={foldingTypes.find(
              o => o.value === getValues('foldingTypeCode')
            )}
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
