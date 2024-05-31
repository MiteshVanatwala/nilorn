import { useEffect, useState } from 'react';
import { SESSION_STORAGE } from '../utils/constant';

export enum Target {
  PRODUCT_DEVELOPMENT = 'product-development',
  PRICE_CALCULATION = 'price-calculation',
  PRODUCTION = 'production',
}

export const useLastVisited = (target: Target) => {
  const [lastVisited, setLastVisited] = useState<string>();

  useEffect(() => {
    let value = '';
    if (target === Target.PRICE_CALCULATION) {
      value =
        sessionStorage.getItem(
          SESSION_STORAGE.LAST_VISITED_PRICE_CALCULATION
        ) ?? '';
    } else if (target === Target.PRODUCTION) {
      value =
        sessionStorage.getItem(SESSION_STORAGE.LAST_VISITED_PRODUCTION) ?? '';
    } else if (target === Target.PRODUCT_DEVELOPMENT) {
      value =
        sessionStorage.getItem(
          SESSION_STORAGE.LAST_VISITED_PRODUCT_DEVELOPMENT
        ) ?? '';
    }
    setLastVisited(value);
  }, [target]);

  const onSetLastVisited = (value: string) => {
    if (target === Target.PRICE_CALCULATION) {
      sessionStorage.setItem(
        SESSION_STORAGE.LAST_VISITED_PRICE_CALCULATION,
        value
      );
    } else if (target === Target.PRODUCTION) {
      sessionStorage.setItem(SESSION_STORAGE.LAST_VISITED_PRODUCTION, value);
    } else if (target === Target.PRODUCT_DEVELOPMENT) {
      sessionStorage.setItem(
        SESSION_STORAGE.LAST_VISITED_PRODUCT_DEVELOPMENT,
        value
      );
    }
    setLastVisited(value);
  };

  return { lastVisited, setLastVisited: onSetLastVisited };
};
