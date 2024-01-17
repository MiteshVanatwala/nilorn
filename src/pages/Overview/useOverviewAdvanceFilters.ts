import { useTranslation } from 'react-i18next';
import { FilterInput, SelectOption } from '../../app/types/types';

export const useOverviewAdvanceFilters = (): SelectOption<FilterInput>[] => {
  const { t } = useTranslation();
  return [
    {
      label: t(`PD.FilterLabel.itemCategories`),
      value: { type: 'select', name: 'itemCategories' },
    },
    {
      label: t(`PD.FilterLabel.productGroups`),
      value: { type: 'select', name: 'productGroups' },
    },
    {
      label: t(`PD.FilterLabel.foldingTypes`),
      value: { type: 'select', name: 'foldingTypes' },
    },
  ];
};
