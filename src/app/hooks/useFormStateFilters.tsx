import { useFilterFormFormWatch } from '../utils/FilterHelper';

export const useFormStateFilters = () => {
  const filters = useFilterFormFormWatch();

  return filters;
};
