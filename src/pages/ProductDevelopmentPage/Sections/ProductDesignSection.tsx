import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import SelectSkeleton from '../../../components/Form/SelectSkeleton';
import FormattedNumberInputField from '../../../components/Form/FormattedNumberInputField';
import FoldingTypeSelect from './SectionComponents/FoldingTypeSelect';

type Props = {
  disableEdit: boolean;
};

const ProductDesignSection = ({ disableEdit }: Props) => {
  const { t } = useTranslation();
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
          {foldingTypes?.length ? (
            <FoldingTypeSelect
              options={foldingTypes ?? []}
              disableEdit={disableEdit}
            />
          ) : (
            <SelectSkeleton
              name="foldingTypeCode"
              label={`${t('PD.FormContent.Folding')}`}
            />
          )}
        </GridItem>
        <GridItem colSpan={12}>
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem colSpan={2}>
              <FormattedNumberInputField
                label={`${t('PD.FormContent.FinishedLengthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedLength'}
                readonly={disableEdit}
                type={'integer'}
                min={0}
                minMessage={`${t('Errors.MinToLow', {
                  min: 0,
                })}`}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormattedNumberInputField
                label={`${t('PD.FormContent.FinishedWidthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedWidth'}
                readonly={disableEdit}
                type={'integer'}
                min={0}
                minMessage={`${t('Errors.MinToLow', {
                  min: 0,
                })}`}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormattedNumberInputField
                label={`${t('PD.FormContent.FinishedHeightMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedHeight'}
                readonly={disableEdit}
                type={'integer'}
                min={0}
                minMessage={`${t('Errors.MinToLow', {
                  min: 0,
                })}`}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default ProductDesignSection;
