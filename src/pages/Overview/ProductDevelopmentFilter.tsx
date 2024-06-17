import { FilterKey } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKey[] = ['clients', 'projects', 'statuses'];

const ProductDevelopmentFilter = () => {
  return <FilterSection createNew standardFilterKeys={STANDARD_KEYS} />;
};

export default ProductDevelopmentFilter;
