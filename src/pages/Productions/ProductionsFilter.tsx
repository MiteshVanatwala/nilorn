import { FilterKey } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKey[] = ['clients', 'projects', 'vendors'];
const FILTER_VALUES_BY_USER = true;

const ProductionsFilter = () => {
  return <FilterSection standardFilterKeys={STANDARD_KEYS} filterByUser={FILTER_VALUES_BY_USER} />;
};

export default ProductionsFilter;
