import { useTranslation } from 'react-i18next';
import { Status } from '../generate';

export const useStatusOptions = (includeClosed?: boolean) => {
  const { t } = useTranslation();

  const statues = [
    {
      label: t('PD.StatusLabel.New'),
      value: Status.NEW,
      color: 'blue',
    },
    {
      label: t('PD.StatusLabel.Design'),
      value: Status.DESIGN,
      color: 'purple',
    },
    {
      label: t('PD.StatusLabel.Artwork'),
      value: Status.ARTWORK,
      color: 'blue',
    },
    {
      label: t('PD.StatusLabel.Sourcing'),
      value: Status.SOURCING,
      color: 'gray',
    },
    {
      label: t('PD.StatusLabel.Calcualtion'),
      value: Status.CALCULATION,
      color: 'blue',
    },
  ];

  if (includeClosed) {
    statues.push(
      {
        label: t('PD.StatusLabel.Approved'),
        value: Status.APPROVED,
        color: 'green',
      },
      {
        label: t('PD.StatusLabel.Rejected'),
        value: Status.REJECTED,
        color: 'red',
      }
    );
  }

  return statues;
};
