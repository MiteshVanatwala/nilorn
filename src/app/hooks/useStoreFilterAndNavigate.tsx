import { useNavigate } from 'react-router-dom';
import { getCurrentStoredFilter } from '../utils/FilterHelper';

const useStoreFilterAndNavigate = () => {
  const navigate = useNavigate();

  const storeFilterAndNavigate = (url: string) => {
    const search = window.location.search;
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem(storedFilter, search);
    navigate(url);
  };

  return storeFilterAndNavigate;
};

export default useStoreFilterAndNavigate;
