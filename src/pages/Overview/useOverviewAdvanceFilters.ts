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
    {
      label: t(`PD.FilterLabel.finishedLengths`),
      value: { type: 'text', name: 'finishedLengths' },
    },
    {
      label: t(`PD.FilterLabel.finishedWidths`),
      value: { type: 'text', name: 'finishedWidths' },
    },
    {
      label: t(`PD.FilterLabel.finishedHeights`),
      value: { type: 'text', name: 'finishedHeights' },
    },
    {
      label: t(`PD.FilterLabel.vendor`),
      value: { type: 'select', name: 'vendor' },
    },
    {
      label: t(`PD.FilterLabel.opComp`),
      value: { type: 'select', name: 'opComp' },
    },
    {
      label: t(`PD.FilterLabel.sourcingCompanies`),
      value: { type: 'select', name: 'sourcingCompanies' },
    },
    {
      label: t(`PD.FilterLabel.salespersonPurchaser`),
      value: { type: 'select', name: 'salespersonPurchaser' },
    },
  ];
};
