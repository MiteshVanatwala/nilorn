import { useTranslation } from 'react-i18next';
import { Grid, GridItem } from '@chakra-ui/react';
import { GRID } from '../../theme/Constants';
import { FilterInput, SelectOption } from '../../app/types/types';
import ActiveFilters from '../../components/Filter/ActiveFilters';
import Filter from '../../components/Filter/Filter';

const ProductionsFilter = () => {
  const { t } = useTranslation();

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
  );
};

export default ProductionsFilter;
