import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import { useWatch } from 'react-hook-form';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { SelectOption } from '../../../app/types/types';
import SelectSkeleton from '../../../components/Form/SelectSkeleton';
import IntegerInputField from '../../../components/Form/IntegerInputField';

type Props = {
  disableEdit: boolean;
};

const ProductDesignSection = ({ disableEdit }: Props) => {
  const { t } = useTranslation();

  const foldingTypeCode = useWatch({ name: 'foldingTypeCode' });
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
            <Select
              options={(foldingTypes as SelectOption[]) ?? []}
              name="foldingTypeCode"
              label={`${t('PD.FormContent.Folding')}`}
              defaultValue={foldingTypes.find(o => o.value === foldingTypeCode)}
              placeholder={`${t('Filter.Select')}`}
              isDisabled={disableEdit}
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
              <IntegerInputField
                label={`${t('PD.FormContent.FinishedLengthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedLength'}
                registerOptions={{ valueAsNumber: true }}
                readonly={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <IntegerInputField
                label={`${t('PD.FormContent.FinishedWidthMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedWidth'}
                registerOptions={{ valueAsNumber: true }}
                readonly={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <IntegerInputField
                label={`${t('PD.FormContent.FinishedHeightMM')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'finishedHeight'}
                registerOptions={{ valueAsNumber: true }}
                readonly={disableEdit}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default ProductDesignSection;
