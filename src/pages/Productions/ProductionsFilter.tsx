import { FilterKeys } from '../../app/types/types';
import FilterSection from '../../components/Filter/FilterSection';

const STANDARD_KEYS: FilterKeys[] = ['clients', 'projects', 'vendors'];

const ProductionsFilter = () => {
  return <FilterSection createNew standardFilterKeys={STANDARD_KEYS} />;
};

export default ProductionsFilter;
