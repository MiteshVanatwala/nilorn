import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../types/types';

export const useOverviewAdvanceFilters = (): SelectOption<AdvanceFilter>[] => {
  const { t } = useTranslation();

  return [
    {
      label: t('PD.SubClient'),
      value: {
        type: 'text',
        name: 'subClient',
      },
    },
    {
      label: t('PD.ItemCategory'),
      value: {
        type: 'text',
        name: 'category',
      },
    },
    {
      label: t('PD.ProductGroup'),
      value: {
        type: 'text',
        name: 'productGroup',
      },
    },
    {
      label: t('PD.FoldingType'),
      value: {
        type: 'select',
        name: 'folding',
      },
    },
    {
      label: t('PD.FinishedLength'),
      value: {
        type: 'text',
        name: 'flength',
      },
    },
    {
      label: t('PD.FinishedWidth'),
      value: {
        type: 'text',
        name: 'fwidth',
      },
    },
    {
      label: t('PD.FinishedHeight'),
      value: {
        type: 'text',
        name: 'fheight',
      },
    },
  ];
};
