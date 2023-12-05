import { useForm } from 'react-hook-form';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { getOverviewAdvanceFilters } from '../../app/utils/getOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import { GRID, SPACE } from '../../theme/Constants';
import FilterSelect from './FilterSelect';
import { findMultiDefaultValues, getSortValue } from './FilterHelper';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { useStatusOptions } from '../../app/hooks/useStatus';
import CreateProductDevelopment from './CreateProductDevelopment';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useEffect } from 'react';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const form = useForm();
  const advanceFilters = getOverviewAdvanceFilters();

  const clientOptions = useFilterOptions('clients');
  const statusOptions = useStatusOptions();

  const { sortState, pageSize, pageNumber } = usePaginationContext();

  useEffect(() => {
    if (sortState[0]?.id) {
      form.setValue('sortKey', getSortValue(sortState[0]));
    }
  }, [form, sortState]);

  useEffect(() => {
    if (pageNumber > 0) {
      form.setValue('pageNumber', pageNumber);
    }
  }, [form, pageNumber]);

  useEffect(() => {
    if (pageSize > 0) {
      form.setValue('pageSize', pageSize);
    }
  }, [form, pageSize]);

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
                name={'clients'}
                defaultValue={findMultiDefaultValues(
                  clientOptions,
                  form.getValues('clients')
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
                name={'statuses'}
                defaultValue={findMultiDefaultValues(
                  statusOptions,
                  form.getValues('statuses')
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
