import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../types/types';

export const useOverviewAdvanceFilters = (): SelectOption<AdvanceFilter>[] => {
  const { t } = useTranslation();

  return [
    {
      label: t('PD.ItemCategory'),
      value: {
        type: 'select',
        name: 'itemCategories',
      },
    },
    {
      label: t('PD.ProductGroup'),
      value: {
        type: 'text',
        name: 'productGroups',
      },
    },
    {
      label: t('PD.FoldingType'),
      value: {
        type: 'select',
        name: 'foldingTypes',
      },
    },
    {
      label: t('PD.Projects'),
      value: {
        type: 'select',
        name: 'projects',
      },
    },
    {
      label: t('PD.FinishedLength'),
      value: {
        type: 'text',
        name: 'finishedLengths',
      },
    },
    {
      label: t('PD.FinishedWidth'),
      value: {
        type: 'text',
        name: 'finishedWidths',
      },
    },
    {
      label: t('PD.FinishedHeight'),
      value: {
        type: 'text',
        name: 'finishedHeights',
      },
    },
    {
      label: t('PD.StockLoaction'),
      value: {
        type: 'text',
        name: 'stockLocation',
      },
    },
    {
      label: t('PD.Vendor'),
      value: {
        type: 'select',
        name: 'vendor',
      },
    },
    {
      label: t('PD.OPcomp'),
      value: {
        type: 'select',
        name: 'opComp',
      },
    },
    {
      label: t('PD.SalespersonPurchaser'),
      value: {
        type: 'select',
        name: 'salespersonPurchaser',
      },
    },
  ];
};
