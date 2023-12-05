import { Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import StatusBadge from '../../components/Status/StatusBadge';
import { ProductDevelopmentBriefDto, Status } from '../../app/generate';
import NowrapText from '../../components/Text/NowrapText';

const useOverviewColumns = () => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper<ProductDevelopmentBriefDto>();
  const columns = [
    columnHelper.accessor('imageUrl', {
      header: `${t('PD.Image')}`,
      enableSorting: false,
      cell: info => {
        if (!info.getValue()) {
          return <></>;
        }
        return (
          <Image
            boxSize="30px"
            objectFit="cover"
            src={info.getValue() ?? ''}
            alt={''}
          />
        );
      },
    }),
    columnHelper.accessor('name', {
      header: `${t('PD.Name')}`,
      cell: info => <NowrapText text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('number', {
      header: `${t('PD.Number')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('versions', {
      header: `${t('PD.Version')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: `${t('PD.Status')}`,
      cell: info => <StatusBadge status={info.getValue() as Status} />,
    }),
    columnHelper.accessor('artwork', {
      header: `${t('PD.Artwork')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('client', {
      header: `${t('PD.Client')}`,
      cell: info => <NowrapText text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('project', {
      header: `${t('PD.Project')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('productGroup', {
      header: `${t('PD.ProductGroup')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('sourcingCompapeies', {
      header: `${t('PD.SourcingCompanies')}`,
      cell: info => info.getValue(),
    }),
  ];

  return columns;
};

export default useOverviewColumns;
