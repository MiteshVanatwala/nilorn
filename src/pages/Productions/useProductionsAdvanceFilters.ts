import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../app/types/types';
import { FilterInput } from '../../app/types/types';

export const useProductionsAdvanceFilters = (): SelectOption<FilterInput>[] => {
  const { t } = useTranslation();
  return [
    {
      label: t(`PD.FilterLabel.itemCategories`),
      value: {
        type: 'select',
        name: 'itemCategories',
      },
    },
    {
      label: t(`PD.FilterLabel.productGroups`),
      value: {
        type: 'text',
        name: 'productGroups',
      },
    },
    {
      label: t(`PD.FilterLabel.statuses`),
      value: {
        type: 'select',
        name: 'statuses',
      },
    },
  ];
};
