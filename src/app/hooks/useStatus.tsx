import { useTranslation } from 'react-i18next';
import { Status } from '../generate';

export const useStatusOptions = (includeClosed?: boolean) => {
  const { t } = useTranslation();

  const status = [
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
    status.push(
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

  const getNextStatus = (currentStatus: Status) => {
    const currentIndex = status.findIndex(item => item.value === currentStatus);
    if (currentIndex !== -1 && currentIndex < status.length - 1) {
      return status[currentIndex + 1].value;
    }
    return null; // return null if the current status is the last one in the array
  };

  return { status, getNextStatus };
};
