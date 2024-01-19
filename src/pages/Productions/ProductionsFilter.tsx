import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import { Grid, GridItem } from '@chakra-ui/react';
import { GRID } from '../../theme/Constants';
import { FilterInput, SelectOption } from '../../app/types/types';
import ActiveFilters from '../../components/Filter/ActiveFilters';
import Filter from '../../components/Filter/Filter';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetFormValues } from '../../components/Filter/FilterHelper';

const ProductionsFilter = () => {
  const { t } = useTranslation();
  const form = useForm();
  const [searchParam] = useSearchParams();

  const { pageSize, pageNumber } = usePaginationContext();

  useEffect(() => {
    resetFormValues(form, searchParam, pageSize);
  }, [form, pageSize, searchParam]);
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
      label: t('PD.FilterLabel.productDevelopments_short'),
      value: { name: 'productDevelopments', type: 'text' },
    },
    {
      label: t('PD.FilterLabel.sourcingCompanies'),
      value: { name: 'sourcingCompanies', type: 'select' },
    },
  ];

  return (
    <FormuQuerySubmit form={form}>
      <Grid templateColumns={GRID.TEMPLATE_COLUMNS}>
        <GridItem
          colSpan={{
            base: 1,
            md: 12,
          }}>
          <Filter hasSearch={false} filterInputs={filterInputs} wideFilter />
          <ActiveFilters />
        </GridItem>
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductionsFilter;
