import { useNavigate } from 'react-router-dom';
import { getCurrentStoredFilter } from '../utils/FilterHelper';
import { SESSION_STORAGE } from '../utils/constant';

const useStoreFilterAndNavigate = () => {
  const navigate = useNavigate();

  const storeBackLink = () => {
    const path = window.location.pathname ?? '/';
    const search = window.location.search;

    sessionStorage.setItem(SESSION_STORAGE.BACK_LINK, path + search);
  };

  const storeFilter = () => {
    const search = window.location.search;
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem(storedFilter, search);
  };

  const storeFilterAndNavigate = (url: string) => {
    storeFilter();
    navigate(url);
  };

  return { storeFilterAndNavigate, storeFilter, storeBackLink };
};

export default useStoreFilterAndNavigate;
