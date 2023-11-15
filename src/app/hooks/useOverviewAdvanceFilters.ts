import { useTranslation } from 'react-i18next';
import { AdvanceFilter, SelectOption } from '../types/types';

export const useOverviewAdvanceFilters = (): SelectOption<AdvanceFilter>[] => {
  const { t } = useTranslation();

  return [
    {
      label: t('PD.ItemCategory'),
      value: {
        type: 'select',
        name: 'itemCategoryCode',
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
        name: 'foldingTypeName',
      },
    },
    {
      label: t('PD.FinishedLength'),
      value: {
        type: 'text',
        name: 'finishedLength',
      },
    },
    {
      label: t('PD.FinishedWidth'),
      value: {
        type: 'text',
        name: 'finishedWidth',
      },
    },
    {
      label: t('PD.FinishedHeight'),
      value: {
        type: 'text',
        name: 'sampleQuantity',
      },
    },
    {
      label: t('PD.FinishedHeight'),
      value: {
        type: 'text',
        name: 'fheight',
      },
    },
    {
      label: t('PD.SourcingCompany'),
      value: {
        type: 'text',
        name: 'sourcingCompany',
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
        type: 'text',
        name: 'vendor',
      },
    },
    {
      label: t('PD.OPcomp'),
      value: {
        type: 'text',
        name: 'opComp',
      },
    },
    {
      label: t('PD.Members'),
      value: {
        type: 'text',
        name: 'members',
      },
    },
  ];
};
