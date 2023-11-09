import { useForm } from 'react-hook-form';
import { Grid, GridItem } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useOverviewAdvanceFilters } from '../../app/hooks/useOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import { GRID, SPACE } from '../../theme/Constants';
import FilterSelect from './FilterSelect';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const advanceFilters = useOverviewAdvanceFilters();
  const form = useForm();

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
              <FilterSelect
                formLabel={t('Filter.Client')}
                name={'client'}
                defaultValue={clientOptions.find(
                  c => c.value === form.getValues('client')
                )}
                options={clientOptions}
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FilterSelect
                formLabel={t('Filter.Status')}
                name={'status'}
                defaultValue={statusOptions.find(
                  c => c.value === form.getValues('status')
                )}
                options={statusOptions}
              />
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
