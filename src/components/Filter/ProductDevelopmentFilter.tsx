import { useForm } from 'react-hook-form';
import { FormLabel, Grid, GridItem } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useOverviewAdvanceFilters } from '../../app/hooks/useOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import Select from '../Form/Select';
import { GRID, SPACE } from '../../theme/Constants';
import { useEffect, useState } from 'react';
import { SelectOption } from '../../app/types/types';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const advanceFilters = useOverviewAdvanceFilters();
  const form = useForm();

  const [defaultStatusFilter, setDefaultStatusFilter] = useState<
    SelectOption<string> | undefined | null
  >(null);
  const [defaultClientFilter, setDefaultClientFilter] = useState<
    SelectOption<string> | undefined | null
  >(null);

  const clientOptions = [
    {
      label: 'Chocolate client',
      value: 'chocolate',
    },
    { label: 'Strawberry client', value: 'strawberry' },
  ];

  const statusOptions = [
    {
      label: 'Chocolate',
      value: 'chocolate',
    },
    { label: 'Strawberry', value: 'strawberry' },
  ];

  useEffect(() => {
    Object.entries(form.getValues()).forEach(([key, value]) => {
      statusOptions?.forEach(filterItem => {
        if (
          filterItem &&
          'value' in filterItem &&
          filterItem.value &&
          filterItem.value === value
        ) {
          if (filterItem !== undefined) {
            setDefaultStatusFilter(filterItem);
          }
        }
      });
      clientOptions?.forEach(clientItem => {
        if (
          clientItem &&
          'value' in clientItem &&
          clientItem.value &&
          clientItem.value === value
        ) {
          if (clientItem !== undefined) {
            setDefaultClientFilter(clientItem);
          }
        }
      });
    });
  }, []);

  return (
    <FormuQuerySubmit form={form}>
      <Grid
        templateColumns={{
          base: GRID.TEMPLATE_COLUMNS.base,
          md: GRID.TEMPLATE_COLUMNS.md,
          lg: GRID.TEMPLATE_COLUMNS.xl,
        }}>
        <GridItem
          colSpan={{
            base: 1,
            md: 10,
          }}>
          <Grid
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: GRID.TEMPLATE_COLUMNS.lg,
            }}
            position={'relative'}
            zIndex={10}>
            <GridItem
              colSpan={{
                base: 1,
                lg: 4,
              }}>
              <InputSearch
                label="Search"
                placeholder={t(`Filter.Search`)}
                name="search"
                variant="filled"
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="client">
                {t('Filter.Client')}
              </FormLabel>
              {defaultClientFilter !== null && (
                <Select
                  name={'client'}
                  defaultValue={defaultClientFilter}
                  options={clientOptions}
                />
              )}
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="status">
                {t('Filter.Status')}
              </FormLabel>
              {defaultStatusFilter !== null && (
                <Select
                  name={'status'}
                  defaultValue={defaultStatusFilter}
                  options={statusOptions}
                />
              )}
            </GridItem>
          </Grid>
          <GridItem>
            <AdvanceFilter filters={advanceFilters} />
          </GridItem>
          <ActiveFilters />
        </GridItem>
        <SearchProfile />
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductDevelopmentFilter;
