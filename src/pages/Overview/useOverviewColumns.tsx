import { useTranslation } from 'react-i18next';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import StatusBadge from '../../components/Status/StatusBadge';
import {
  MediaFileDto,
  ProductDevelopmentBriefDto,
  Status,
} from '../../app/generate';
import NowrapText from '../../components/Text/NowrapText';
import ImagePopup from '../../components/ImagePopup/ImagePopup';
import ArtworkButton from '../../components/Button/ArtworkButton';
import { Spinner, Text, Tooltip } from '@chakra-ui/react';
import CommentPopup from '../../components/CommentPopup/CommentPopup';

interface CustomCellContext
  extends CellContext<ProductDevelopmentBriefDto, MediaFileDto | undefined> {
  isLoading?: boolean;
}

const projectSort = (
  rowA: any,
  rowB: any,
  columnId: string
) => {
  const normalize = (val: any) =>
    (val === null || val === undefined ? '' : val.toString().replace(/\s+/g, ' ').trim().toLowerCase());
  const a = normalize(rowA.getValue(columnId));
  const b = normalize(rowB.getValue(columnId));
  if (a === b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

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
      cell: info => {
        const versions = info.getValue();
        return (
          <CommentPopup
            icon={<Text>{versions}</Text>}
            comment={info.row.original?.versionSpecification ?? ''}
            padding="0"
            showIconWithoutComment
          />
        );
      },
    }),
    columnHelper.accessor('versions', {
      header: `${t('PD.Version.Version')}`,
      enableSorting: false,
      cell: info =>
        (info.getValue() as number) > 1 ? (info.getValue() as Number) : '',
    }),
    columnHelper.accessor('status', {
      header: `${t('PD.Status')}`,
      cell: info => <StatusBadge status={info.getValue() as Status} />,
    }),
    columnHelper.accessor('artwork', {
      header: `${t('PD.Artwork')}`,
      enableSorting: false,
      cell: (info: CustomCellContext) => {
        if (info.isLoading) {
          return <Spinner />;
        } else if (info.getValue()) {
          return (
            <ArtworkButton
              size="SMALL"
              artwork={info.getValue() as MediaFileDto}
            />
          );
        }
        return <></>;
      },
    }),
    columnHelper.accessor('client', {
      id: 'Client',
      header: 'Client',
      enableSorting: true,
      cell: info => <NowrapText text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('project', {
      id: 'Project',
      header: 'Project',
      enableSorting: true,
      cell: info => <NowrapText text={info.getValue() ?? ''} />,
    }),
    columnHelper.accessor('productGroup', {
      id: 'ProductGroup',
      header: 'Product Group',
      enableSorting: true,
      cell: info => (
        <Tooltip label={info.getValue()}>
          <Text
            maxW={'25ch'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}>
            {info.getValue()}
          </Text>
        </Tooltip>
      ),
      maxSize: 100,
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
