import { FilterKey } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKey[] = ['clients', 'projects', 'vendors'];

const ProductionsFilter = () => {
  return <FilterSection standardFilterKeys={STANDARD_KEYS} />;
};

export default ProductionsFilter;
