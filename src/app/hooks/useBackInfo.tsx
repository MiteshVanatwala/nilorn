import { useTranslation } from 'react-i18next';
import { SESSION_STORAGE } from '../utils/constant';
import { useEffect, useState } from 'react';

export const useBackInfo = () => {
  const { t } = useTranslation();

  const [backInfo, setBackInfo] = useState<{
    link: string;
    label: string;
    filter: string;
  }>();
  const backLink = sessionStorage.getItem(SESSION_STORAGE.backLink) ?? '/';

  useEffect(() => {
    if (backLink != null) {
      if (backLink.indexOf('productions') > -1) {
        setBackInfo({
          link: backLink,
          label: t('PD.BackToProductions'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.prevFilterProductions) ?? '',
        });
      } else if (backLink.indexOf('price-calculations') > -1) {
        setBackInfo({
          link: backLink,
          label: t('PD.BackToCalculations'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.prevFilterCalculation) ?? '',
        });
      } else {
        setBackInfo({
          link: backLink,
          label: t('PD.BackToOverview'),
          filter:
            sessionStorage.getItem(SESSION_STORAGE.prevFilterOverview) ?? '',
        });
      }
    }
  }, [backLink, t]);

  return { backInfo };
};
