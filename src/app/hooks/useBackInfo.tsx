import { useTranslation } from 'react-i18next';
import { SESSION_STORAGE } from '../utils/constant';
import { useEffect, useState } from 'react';

export const useBackInfo = () => {
  const { t } = useTranslation();

  const [backInfo, setBackInfo] = useState<{
    link: string;
    view: 'productions' | 'price-calculations' | 'overview';
    label: string;
    filter: string;
  }>();
  const backLink = sessionStorage.getItem(SESSION_STORAGE.BACK_LINK) ?? '/';

  useEffect(() => {
    if (backLink != null) {
      if (backLink.indexOf('productions') > -1) {
        setBackInfo({
          link: backLink,
          view: 'productions',
          label: t('PD.BackToProductions'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.PREV_FILTER_PRODUCTIONS) ?? '',
        });
      } else if (backLink.indexOf('price-calculations') > -1) {
        setBackInfo({
          link: backLink,
          view: 'price-calculations',
          label: t('PD.BackToCalculations'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.PREV_FILTER_CALCULATION) ?? '',
        });
      } else {
        setBackInfo({
          link: backLink,
          view: 'overview',
          label: t('PD.BackToOverview'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.PREV_FILTER_OVERVIEW) ?? '',
        });
      }
    }
  }, [backLink, t]);

  return { backInfo };
};
