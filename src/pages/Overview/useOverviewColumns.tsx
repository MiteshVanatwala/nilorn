import { useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import StatusBadge from '../../components/Status/StatusBadge';
import {
  MediaFileDto,
  ProductDevelopmentBriefDto,
  Status,
} from '../../app/generate';
import NowrapText from '../../components/Text/NowrapText';
import ImagePopup from '../../components/ImagePopup/ImagePopup';
import ArtworkButton from '../../components/Button/ArtworkButton';

const useOverviewColumns = () => {
  const { t } = useTranslation();

  const columnHelper = createColumnHelper<ProductDevelopmentBriefDto>();
  const columns = [
    columnHelper.accessor('thumbnailData', {
      header: `${t('PD.Image')}`,
      enableSorting: false,
      size: 10,
      cell: info => {
        if (!info.getValue()) {
          return <></>;
        }
        return (
          <ImagePopup
            thumbnail={true}
            alt="Thumbnail image"
            src={
              info.getValue() ? `data:image/jpeg;base64,${info.getValue()}` : ''
            }
          />
        );
      },
    }),
    columnHelper.accessor('name', {
      header: `${t('PD.Name')}`,
      cell: info => <NowrapText text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('no', {
      header: `${t('PD.Number')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('versions', {
      header: `${t('PD.Version')}`,
      enableSorting: false,
      cell: info =>
        info.getValue() === 0 ? '' : (info.getValue() as number) + 1,
    }),
    columnHelper.accessor('status', {
      header: `${t('PD.Status')}`,
      cell: info => <StatusBadge status={info.getValue() as Status} />,
    }),
    columnHelper.accessor('artwork', {
      header: `${t('PD.Artwork')}`,
      enableSorting: false,
      cell: info =>
        info.getValue() ? (
          <ArtworkButton
            size="SMALL"
            artwork={info.getValue() as MediaFileDto}
          />
        ) : (
          ''
        ),
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
    columnHelper.accessor('itemCategory', {
      header: `${t('PD.ItemCategory')}`,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('sourcings', {
      header: `${t('PD.SourcingCompanies')}`,
      enableSorting: false,
      cell: info => info.getValue()?.join(', '),
    }),
  ];

  return columns;
};

export default useOverviewColumns;
