import { useTranslation } from 'react-i18next';
import { ChargeBasis } from '../generate';

export type StatusInfo = {
  label: string;
  value: ChargeBasis;
};
export const useChargeBasisOptions = (isFilter?: boolean) => {
  const { t } = useTranslation();

  const allChargeBasis: StatusInfo[] = [
    {
      label: t('Production.ChargeBasisLabel.PerOption'),
      value: ChargeBasis.PER_OPTION
    }   
  ];

  return { allChargeBasis };
};
