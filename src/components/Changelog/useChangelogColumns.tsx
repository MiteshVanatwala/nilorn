import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { renderIcon } from '../../app/utils/changelog';
import { Text } from '@chakra-ui/react';
import TruncateTextTooltip from '../Text/TruncateTextTooltip';
import { ChangeType, ChangelogItemDto } from '../../app/generate';

const useChangelogColumns = () => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper<ChangelogItemDto>();
  const columns = [
    columnHelper.accessor('changeType', {
      header: ``,
      cell: info => renderIcon(info.getValue() as ChangeType),
    }),
    columnHelper.accessor('from', {
      header: `${t('Changelog.From')}`,
      cell: info => <TruncateTextTooltip text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('to', {
      header: `${t('Changelog.To')}`,
      cell: info => <TruncateTextTooltip text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('username', {
      header: `${t('Changelog.By')}`,
      cell: info => <Text variant={'bodyBold'}>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('dateTime', {
      header: `${t('Changelog.When')}`,
      cell: info => (
        <Text>{new Date(info.getValue() ?? '').toLocaleString()}</Text>
      ),
    }),
  ];

  return columns;
};

export default useChangelogColumns;
