import { FilterKey } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKey[] = ['clients', 'projects', 'statuses'];
const FILTER_VALUES_BY_USER = true;

const ProductDevelopmentFilter = () => {
  return <FilterSection createNew standardFilterKeys={STANDARD_KEYS} filterByUser={FILTER_VALUES_BY_USER} />;
};

export default ProductDevelopmentFilter;
