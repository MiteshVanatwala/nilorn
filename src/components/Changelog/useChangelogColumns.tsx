import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { renderIcon } from '../../app/utils/changelog';
import { Text } from '@chakra-ui/react';
import TruncateTextTooltip from '../Text/TruncateTextTooltip';

export enum CahngeType {
  'NEW',
  'UPDATE',
  'DELETE',
}
export type ChangelogItem = {
  type: CahngeType;
  from: string;
  to: string;
  user: string;
  dateTime: string;
};

export const mock: ChangelogItem[] = [
  {
    type: CahngeType.UPDATE,
    from: 'Nullam in consequat lectus. Cras aliquet sapien a ultrices faucibus.',
    to: 'Suspendisse potenti. Nullam in consequat lectus. Cras aliquet sapien a ultrices faucibus. Mauris maximus felis vel lobortis egestas. Praesent tincidunt lacinia massa condimentum porta. Maecenas pulvinar magna vel est blandit, a fringilla ante hendrerit. Maecenas semper diam orci, eu consequat mauris blandit ut. Donec sed sodales metus. Nunc et turpis tincidunt, tempus odio in, aliquet quam. Vestibulum eu neque ut odio lobortis bibendum ut tincidunt nulla.',
    user: 'SELIKA',
    dateTime: new Date(-1).toString(),
  },
  {
    type: CahngeType.UPDATE,
    from: 'Cras aliquet sapien a ultrices faucibus.',
    to: 'Nullam in consequat lectus. Cras aliquet sapien a ultrices faucibus.',
    user: 'SELIKA',
    dateTime: new Date(-2).toString(),
  },
  {
    type: CahngeType.UPDATE,
    from: 'TBD',
    to: 'Cras aliquet sapien a ultrices faucibus.',
    user: 'SELIKA',
    dateTime: new Date(-3).toString(),
  },
  {
    type: CahngeType.NEW,
    from: '',
    to: 'TBD',
    user: 'SELIKA',
    dateTime: new Date(-4).toString(),
  },
];

const useChangelogColumns = () => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper<ChangelogItem>();
  const columns = [
    columnHelper.accessor('type', {
      header: ``,
      cell: info => renderIcon(info.getValue()),
    }),
    columnHelper.accessor('to', {
      header: `${t('Changelog.To')}`,
      cell: info => <TruncateTextTooltip text={info.getValue()} />,
    }),
    columnHelper.accessor('from', {
      header: `${t('Changelog.From')}`,
      cell: info => <TruncateTextTooltip text={info.getValue()} />,
    }),
    columnHelper.accessor('user', {
      header: `${t('Changelog.By')}`,
      cell: info => <Text variant={'bodyBold'}>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('dateTime', {
      header: `${t('Changelog.When')}`,
      cell: info => <Text>{new Date(info.getValue()).toLocaleString()}</Text>,
    }),
  ];

  return columns;
};

export default useChangelogColumns;
