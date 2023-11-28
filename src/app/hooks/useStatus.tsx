import { useTranslation } from 'react-i18next';
import { Status } from '../generate';

export const useStatusOptions = () => {
  const { t } = useTranslation();

  return [
    {
      label: t('PD.StatusLabel.New'),
      value: Status.NEW,
    },
    {
      label: t('PD.StatusLabel.Design'),
      value: Status.DESIGN,
    },
    {
      label: t('PD.StatusLabel.Artwork'),
      value: Status.ARTWORK,
    },
    {
      label: t('PD.StatusLabel.Sourcing'),
      value: Status.SOURCING,
    },
    {
      label: t('PD.StatusLabel.Calcualtion'),
      value: Status.CALCULATION,
    },
  ];
};
