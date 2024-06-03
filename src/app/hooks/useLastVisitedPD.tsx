import { useEffect, useState } from 'react';
import { SESSION_STORAGE } from '../utils/constant';

export const useLastVisitedPD = () => {
  const [lastVisitedPD, setLastVisitedPD] = useState<string>();

  useEffect(() => {
    const value =
      sessionStorage.getItem(
        SESSION_STORAGE.LAST_VISITED_PRODUCT_DEVELOPMENT
      ) ?? '';
    setLastVisitedPD(value);
  }, []);

  const onSetLastVisitedPD = (value: string) => {
    sessionStorage.setItem(
      SESSION_STORAGE.LAST_VISITED_PRODUCT_DEVELOPMENT,
      value
    );
    setLastVisitedPD(value);
  };

  return { lastVisitedPD, setLastVisitedPD: onSetLastVisitedPD };
};
