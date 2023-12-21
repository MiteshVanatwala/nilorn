import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Select from '../../../components/Form/Select';
import InputField from '../../../components/Form/InputField';
import TextArea from '../../../components/Form/TextArea';
import { useFormContext, useWatch } from 'react-hook-form';
import { useProductGroup } from '../../../app/api/FilterInfo';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import { SelectOption } from '../../../app/types/types';
import SelectSkeleton from '../../../components/Form/SelectSkeleton';

const GeneralSection = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const itemCategoryCode = useWatch({ name: 'itemCategoryCode' });

  const itemCategories = useFilterOptions('itemCategories');
  const { data: productGroups } = useProductGroup(
    typeof itemCategoryCode === 'string' ?? false,
    itemCategoryCode as string
  );

  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          colSpan={{
            base: 12,
            lg: 6,
          }}>
          <TextArea
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
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          {itemCategories?.length ? (
            <Select
              options={(itemCategories as SelectOption[]) ?? []}
              name="itemCategoryCode"
              label={`${t('PD.FormContent.ItemCategory')}`}
              defaultValue={
                itemCategories && itemCategoryCode
                  ? (itemCategories as SelectOption[]).find(
                      o => o.value === itemCategoryCode
                    )
                  : undefined
              }
              placeholder={`${t('Filter.Select')}`}
            />
          ) : (
            <SelectSkeleton
              name="itemCategoryCode"
              label={`${t('PD.FormContent.ItemCategory')}`}
            />
          )}
        </GridItem>
        <GridItem
          colSpan={{
            base: 12,
            lg: 2,
          }}>
          <Select
            options={(productGroups as SelectOption[]) ?? []}
            name="productGroupCode"
            label={`${t('PD.FormContent.ProductGroup')}`}
            isDisabled={!itemCategoryCode}
            defaultValue={
              productGroups
                ? (productGroups as SelectOption[]).find(
                    o => o.value === getValues('productGroupCode')
                  )
                : undefined
            }
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
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSalesPrice'}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                type="number"
                name={'freightIncluded'}
                registerOptions={{ valueAsNumber: true }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.SampleQuantity')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'sampleQuantity'}
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

export default GeneralSection;
