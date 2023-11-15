import { Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import StatusBadge from '../../components/Status/StatusBadge';
import { ProductDevelopmentBriefDto } from '../../app/generate';

const useOverviewColumns = () => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper<ProductDevelopmentBriefDto>();
  const columns = [
    columnHelper.accessor('image', {
      header: `${t('PD.Image')}`,
      cell: info => {
        return (
          <Image
            boxSize="30px"
            objectFit="cover"
            src={`${info.getValue() ?? ''}`}
            alt={`${info.getValue() ?? ''}`}
          />
        );
      },
    }),
    columnHelper.accessor('name', {
      header: `${t('PD.Name')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('productDevelopmentNo', {
      header: `${t('PD.Number')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: `${t('PD.Status')}`,
      cell: info => <StatusBadge status={info.getValue()} />,
    }),
    // columnHelper.accessor('artwork', {
    //   header: `${t('PD.Artwork')}`,
    //   cell: info => info.getValue(),
    // }),
    // columnHelper.accessor('client', {
    //   header: `${t('PD.Client')}`,
    //   cell: info => info.getValue(),
    // }),
    // columnHelper.accessor('type', {
    //   header: `${t('PD.type')}`,
    //   cell: info => info.getValue(),
    // }),
    // columnHelper.accessor('productGroup', {
    //   header: `${t('PD.ProductGroup')}`,
    //   cell: info => info.getValue(),
    // }),
  ];

  return columns;
};

export default useOverviewColumns;
