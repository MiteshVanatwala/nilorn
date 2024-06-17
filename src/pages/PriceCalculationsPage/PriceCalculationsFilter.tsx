import { FilterKeys } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKeys[] = [
  'clients',
  'projects',
  'sourcingCompanies',
];

const PriceCalculationsFilter = () => {
  return <FilterSection standardFilterKeys={STANDARD_KEYS} />;
};

export default PriceCalculationsFilter;
