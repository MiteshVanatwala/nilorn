import { useTranslation } from 'react-i18next';
import { Status } from '../generate';
import { useAuthorizedToFilterOnStatus } from '../Permissions/usePremissions';

export type StatusInfo = {
  label: string;
  value: Status;
  color: 'blue' | 'purple' | 'orange' | 'gray' | 'yellow' | 'green' | 'red';
};
export const useStatusOptions = (isFilter?: boolean) => {
  const isAuthorizedToFilterOnStatus = useAuthorizedToFilterOnStatus();
  const { t } = useTranslation();

  const allStatuses: StatusInfo[] = [
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
      color: 'orange',
    },
    {
      label: t('PD.StatusLabel.Sourcing'),
      value: Status.SOURCING,
      color: 'gray',
    },
    {
      label: t('PD.StatusLabel.Calculation'),
      value: Status.CALCULATION,
      color: 'yellow',
    },
    {
      label: t('PD.StatusLabel.Approved'),
      value: Status.APPROVED,
      color: 'green',
    },
    {
      label: t('PD.StatusLabel.Rejected'),
      value: Status.REJECTED,
      color: 'red',
    },
    {
      label: t('PD.StatusLabel.Deleted'),
      value: Status.DELETED,
      color: 'red',
    },
  ];

  const statuses = isFilter
    ? allStatuses.filter(status => isAuthorizedToFilterOnStatus(status.value))
    : allStatuses;

  const getNextStatus = (currentStatus: Status) => {
    const currentIndex = allStatuses.findIndex(
      item => item.value === currentStatus
    );
    if (currentIndex !== -1 && currentIndex < statuses.length - 1) {
      return statuses[currentIndex + 1].value;
    }
    return null; // return null if the current status is the last one in the array
  };

  return { statuses, getNextStatus };
};
