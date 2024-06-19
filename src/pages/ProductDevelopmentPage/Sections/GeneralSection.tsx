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
import FormattedNumberInputField from '../../../components/Form/FormattedNumberInputField';
type Props = {
  disableEdit: boolean;
  createNew: boolean;
};

const GeneralSection = ({ createNew, disableEdit }: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const status = useWatch({ name: 'status' });
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
      setValue('productGroupCode', null);
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
            readonly={disableEdit}
            registerOptions={{
              maxLength: 500,
            }}
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 0,
            lg: 6,
          }}>
          <InputField
            label={`${t('PD.FormContent.VersionSpecification')}`}
            placeholder={`${t('Common.Placeholder')}`}
            name={'versionSpecification'}
            readonly={disableEdit}
            registerOptions={{ maxLength: 60 }}
          />
        </GridItem>
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
                required: createNew ? false : status !== Status.NEW,
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
          {productGroups?.length && productGroupCode !== null && (
            <Select
              options={(productGroups as SelectOption[]) ?? []}
              name="productGroupCode"
              label={`${t('PD.FormContent.ProductGroup')}`}
              registerOptions={{
                required: createNew ? false : status !== Status.NEW,
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
          {(!productGroups?.length || productGroupCode === null) && (
            <Select
              options={(productGroups as SelectOption[]) ?? []}
              name="productGroupCode"
              label={`${t('PD.FormContent.ProductGroup')}`}
              registerOptions={{
                required: createNew ? false : status !== Status.NEW,
              }}
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
                readonly={disableEdit}
                registerOptions={{ maxLength: 20 }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputField
                label={`${t('PD.FormContent.TargetSales')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'targetSalesPrice'}
                readonly={disableEdit}
                registerOptions={{ maxLength: 50 }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormattedNumberInputField
                label={`${t('PD.FormContent.FreightIncluded')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'freightIncluded'}
                readonly={disableEdit}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormattedNumberInputField
                label={`${t('PD.FormContent.SampleQuantity')}`}
                placeholder={`${t('Common.Placeholder')}`}
                name={'sampleQuantity'}
                readonly={disableEdit}
                type={'integer'}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </AccordionItem>
  );
};

export default GeneralSection;
