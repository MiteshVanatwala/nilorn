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

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const advanceFilters = useOverviewAdvanceFilters();
  const form = useForm();

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
              <Select
                name={'client'}
                options={[
                  {
                    label: 'Chocolate',
                    value: 'chocolate',
                  },
                  { label: 'Strawberry', value: 'strawberry' },
                ]}
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="status">
                {t('Filter.Status')}
              </FormLabel>
              <Select
                name={'status'}
                options={[
                  {
                    label: 'Chocolate client',
                    value: 'chocolate',
                  },
                  { label: 'Strawberry client', value: 'strawberry' },
                ]}
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
