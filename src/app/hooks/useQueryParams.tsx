import { useLocation } from 'react-router';
import { parseSearchParams } from '../utils/FilterHelper';

export const useQueryParams = () => {
  const location = useLocation();
  const filters = parseSearchParams(location.search ?? '');
  return filters;
};
