import { useForm, useFormContext } from 'react-hook-form';
import { Grid, GridItem, Input, VStack } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useOverviewAdvanceFilters } from '../../app/hooks/useOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import { GRID, SPACE } from '../../theme/Constants';
import FilterSelect from './FilterSelect';
import { findMultiDefaultValues, getSortValue } from './FilterHelper';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { useStatusOptions } from '../../app/hooks/useStatus';
import CreateProductDevelopment from './CreateProductDevelopment';
import FormuQuerySubmit, { SORT } from '../Form/FormQuerySubmit';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useEffect } from 'react';
import InputField from '../Form/InputField';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const { setValue, unregister, getValues } = useFormContext();
  const advanceFilters = useOverviewAdvanceFilters();

  const clientOptions = useFilterOptions('clients');
  const statusOptions = useStatusOptions();

  const { sortState } = usePaginationContext();

  useEffect(() => {
    if (sortState[0]?.id) {
      setValue(SORT, getSortValue(sortState[0]));
    } else {
      unregister(SORT);
    }
  }, [sortState]);

  return (
    <>
      <Input onChange={e => setValue('tst', e.target.value)} />
      <InputField name="linnea" />
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
                name={'clients'}
                defaultValue={findMultiDefaultValues(
                  clientOptions,
                  getValues('clients')
                )}
                options={clientOptions}
              />
            </GridItem>
            <GridItem>
              <h1>{sortState[0]?.id ?? 'no sort'}</h1>
              <h1>{sortState[0]?.desc ? 'DESC' : 'ASC'}</h1>
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FilterSelect
                label={t('Filter.Status')}
                name={'statuses'}
                defaultValue={findMultiDefaultValues(
                  clientOptions,
                  getValues('statuses')
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
    </>
  );
};

export default ProductDevelopmentFilter;
