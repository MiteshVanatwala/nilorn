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
import { useEffect, useState } from 'react';
import { useProductDevelopmentChangelog } from '../../../app/hooks/useChangelog';
import { Status } from '../../../app/generate';
type Props = {
  disableEdit: boolean;
};

const GeneralSection = ({ disableEdit }: Props) => {
  const { t } = useTranslation();
  const { setValue, getValues } = useFormContext();
  const status = getValues('status');
  const itemCategoryCode = useWatch({ name: 'itemCategoryCode' });
  const productGroupCode = useWatch({ name: 'productGroupCode' });
  const [itemCategoryCodeStartVal, setItemCategoryCodeStartVal] =
    useState<string>(itemCategoryCode);

  const itemCategories = useFilterOptions('itemCategories');
  const { data: productGroups } = useProductGroup(
    typeof itemCategoryCode === 'string' ?? false,
    itemCategoryCode as string
  );
  useEffect(() => {
    if (itemCategoryCodeStartVal !== itemCategoryCode) {
      setValue('productGroupCode', '');
      setItemCategoryCodeStartVal(itemCategoryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCategoryCode]);

  const itemNoChangelog = useProductDevelopmentChangelog('ItemNo');

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
            isDisabled={disableEdit}
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
              registerOptions={{
                required: status !== Status.NEW,
              }}
              defaultValue={
                itemCategories && itemCategoryCode
                  ? (itemCategories as SelectOption[]).find(
                      o => o.value === itemCategoryCode
                    )
                  : undefined
              }
              isDisabled={disableEdit}
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
          {productGroups?.length && productGroupCode !== '' && (
            <Select
              options={(productGroups as SelectOption[]) ?? []}
              name="productGroupCode"
              label={`${t('PD.FormContent.ProductGroup')}`}
              registerOptions={{
                required: status !== Status.NEW,
              }}
              defaultValue={
                productGroups && productGroupCode
                  ? (productGroups as SelectOption[]).find(
                      o => o.value === productGroupCode
                    )
                  : undefined
              }
              isDisabled={!itemCategoryCode || disableEdit}
              placeholder={`${t('Filter.Select')}`}
            />
          )}
          {(!productGroups?.length || productGroupCode === '') && (
            <Select
              options={(productGroups as SelectOption[]) ?? []}
              name="productGroupCode"
              label={`${t('PD.FormContent.ProductGroup')}`}
              isDisabled={!itemCategoryCode || disableEdit}
              placeholder={`${t('Filter.Select')}`}
            />
          )}
        </GridItem>
        <GridItem colSpan={12}>
          <Grid gap={GRID.GAP} templateColumns={GRID.TEMPLATE_COLUMNS}>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.ItemNumber')}`}
                placeholder={`${t('Common.Placeholder')}`}
                changelog={itemNoChangelog}
                name={'itemNo'}
                isDisabled={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSalesPrice'}
                isDisabled={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                type="number"
                name={'freightIncluded'}
                registerOptions={{ valueAsNumber: true }}
                isDisabled={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.SampleQuantity')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'sampleQuantity'}
                type="number"
                registerOptions={{ valueAsNumber: true }}
                isDisabled={disableEdit}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default GeneralSection;
