import { FilterInput } from '../types/types';

export const getOverviewAdvanceFilters = (): FilterInput[] => {
  return [
    {
      type: 'select',
      name: 'itemCategories',
    },
    {
      type: 'text',
      name: 'productGroups',
    },
    {
      type: 'select',
      name: 'foldingTypes',
    },
    {
      type: 'select',
      name: 'projects',
    },
    {
      type: 'text',
      name: 'finishedLengths',
    },
    {
      type: 'text',
      name: 'finishedWidths',
    },
    {
      type: 'text',
      name: 'finishedHeights',
    },
    {
      type: 'text',
      name: 'stockLocation',
    },
    {
      type: 'select',
      name: 'vendor',
    },
    {
      type: 'select',
      name: 'opComp',
    },
    {
      type: 'select',
      name: 'salespersonPurchaser',
    },
  ];
};
