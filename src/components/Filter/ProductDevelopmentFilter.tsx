import { useForm } from 'react-hook-form';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useOverviewAdvanceFilters } from '../../pages/Overview/useOverviewAdvanceFilters';
import AdvanceFilter from './AdvanceFilter';
import { GRID, SPACE } from '../../theme/Constants';
import { getSortValue } from './FilterHelper';
import CreateProductDevelopment from './CreateProductDevelopment';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useEffect } from 'react';
import Filter from './Filter';
import { FilterInput, SelectOption } from '../../app/types/types';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const form = useForm();
  const advanceFilters = useOverviewAdvanceFilters();

  const filterInputs: SelectOption<FilterInput>[] = [
    {
      label: t('PD.FilterLabel.clients'),
      value: { name: 'clients', type: 'select' },
    },
    {
      label: t('PD.FilterLabel.projects'),
      value: { name: 'projects', type: 'select' },
    },
    {
      label: t('PD.FilterLabel.statuses'),
      value: { name: 'statuses', type: 'select' },
    },
  ];

  const { sortState, pageSize, pageNumber } = usePaginationContext();

  useEffect(() => {
    if (sortState[0]?.id) {
      form.setValue('sortKey', getSortValue(sortState[0]));
    }
  }, [form, sortState]);

  return (
    <FormuQuerySubmit pageSize={pageSize} pageNumber={pageNumber} form={form}>
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
          <Filter hasSearch filterInputs={filterInputs} />
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
