import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import { Grid, GridItem } from '@chakra-ui/react';
import { GRID } from '../../theme/Constants';
import { FilterInput, SelectOption } from '../../app/types/types';
import ActiveFilters from '../../components/Filter/ActiveFilters';
import Filter from '../../components/Filter/Filter';
import AdvanceFilter from '../../components/Filter/AdvanceFilter';
import { useProductionsAdvanceFilters } from './useProductionsAdvanceFilters';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useEffect } from 'react';

const ProductionsFilter = () => {
  const { t } = useTranslation();
  const form = useForm();

  const { pageSize, pageNumber } = usePaginationContext();

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
  const filterInputs: SelectOption<FilterInput>[] = [
    {
      label: t('PD.FilterLabel.vendor'),
      value: { name: 'vendor', type: 'select' },
    },
    {
      label: t('PD.FilterLabel.clients'),
      value: { name: 'clients', type: 'select' },
    },
    {
      label: t('PD.FilterLabel.projects'),
      value: { name: 'projects', type: 'select' },
    },
    {
      label: t('PD.FilterLabel.number'),
      value: { name: 'number', type: 'text' },
    },
    {
      label: t('PD.FilterLabel.sourcingCompanies'),
      value: { name: 'sourcingCompanies', type: 'select' },
    },
  ];
  const advanceFilters = useProductionsAdvanceFilters();

  return (
    <FormuQuerySubmit form={form}>
      <Grid templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          colSpan={{
            base: 1,
            md: 10,
          }}>
          <Filter hasSearch={true} filterInputs={filterInputs} />
          <GridItem>
            <AdvanceFilter filters={advanceFilters} />
          </GridItem>
          <ActiveFilters />
        </GridItem>
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductionsFilter;
