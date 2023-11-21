import { useForm } from 'react-hook-form';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useOverviewAdvanceFilters } from '../../app/hooks/useOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import { GRID, SPACE } from '../../theme/Constants';
import FilterSelect from './FilterSelect';
import CreateProductDevelopment from './CreateProductDevelopment';

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
      label: 'New status',
      value: 'new',
    },
    { label: 'Done status', value: 'done' },
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
                name="searchQuery"
                variant="filled"
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FilterSelect
                label={t('Filter.Client')}
                name={'client'}
                defaultValue={clientOptions.find(
                  c =>
                    c.value === form.getValues('client') ||
                    c.value === form.getValues('client')?.value
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
                label={t('Filter.Status')}
                name={'status'}
                defaultValue={statusOptions.find(
                  c =>
                    c.value === form.getValues('status') ||
                    c.value === form.getValues('status')?.value
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
        <GridItem
          marginTop={{
            base: SPACE.XS,
            md: '0',
          }}
          colSpan={2}>
          <VStack
            pb={{ base: SPACE.XXS, lg: SPACE.MD }}
            alignItems={{
              base: 'start',
              lg: 'end',
            }}
            h={'full'}
            justifyContent={'space-between'}
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}>
            <SearchProfile />
            <CreateProductDevelopment />
          </VStack>
        </GridItem>
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductDevelopmentFilter;
