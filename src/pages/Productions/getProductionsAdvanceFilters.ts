import { FilterInput } from '../../app/types/types';

export const getProductionsAdvanceFilters = (): FilterInput[] => {
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
      name: 'statuses',
    },
  ];
};
