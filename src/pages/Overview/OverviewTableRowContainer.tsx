import { Row } from '@tanstack/react-table';
import { TBodyRow } from '../../components/Table/TBodyRow';
import { useNavigate } from 'react-router';
import { MediaFileType, ProductDevelopmentBriefDto } from '../../app/generate';
import { MouseEvent, useRef, useState } from 'react';
import { SESSION_STORAGE } from '../../app/utils/constant';
import { isClosed } from '../../app/utils/status';
import { useTranslation } from 'react-i18next';
import IsolatedModal, { ModalRef } from '../../components/Modal/IsolatedModal';
import { useToast } from '../../app/hooks/useToast';
import { useUploadFile } from '../../app/api/mediaFile';
import { useQueryClient } from 'react-query';
import QueryKeysEnum from '../../app/api/queryKeys';

type Props = {
  row: Row<ProductDevelopmentBriefDto>;
  bgColor?: string;
};

const OverviewTableRowContainer = ({ row, bgColor }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const modalRef = useRef<ModalRef>(null);
  const queryClient = useQueryClient();

  const { no, artwork } = row.original;
  const rowNo = no ?? '';

  const [file, setFile] = useState<File | undefined>(undefined);
  const { mutate, isLoading } = useUploadFile(rowNo, MediaFileType.ARTWORK);

  const handleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    url: string,
    id: string
  ) => {
    e.stopPropagation();
    const path = window.location.pathname ?? '/';
    const search = window.location.search;
    const anchor = id ? `#${id}` : '';
    sessionStorage.setItem(SESSION_STORAGE.backLink, path + search + anchor);
    sessionStorage.setItem(
      SESSION_STORAGE.prevFilterOverview,
      window.location.search
    );
    navigate(url);
  };

  const handelUpload = (file: File) => {
    if (!!artwork) {
      modalRef.current?.onOpen();
      setFile(file);
    } else if (!!no) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File, replace?: boolean) => {
    mutate(file, {
      onSuccess: () => {
        showToast({
          status: 'success',
          description: t('PD.Feedback.Success.FileUpdated', {
            name: file?.name,
          }),
        });
        queryClient.invalidateQueries([QueryKeysEnum.Overview]);
      },
      onError: () => {
        showToast({
          status: 'error',
          description: t('PD.Feedback.Error.FileUpdated', {
            name: file?.name,
          }),
        });
      },
    });
  };

  return (
    <>
      <IsolatedModal
        ref={modalRef}
        title={t('PD.File.ReplaceArtworkTitle')}
        description={t('PD.File.ReplaceArtworkDescription')}
        confirmText={t('Common.Yes')}
        cancelText={t('Common.No')}
        onConfirm={() => file && uploadFile(file, true)}
      />
      <TBodyRow
        row={row}
        id={rowNo}
        bgColor={bgColor}
        isLoading={isLoading}
        tooltipMsg={t('PD.File.DragDropArtwork', {
          no: (row.original as ProductDevelopmentBriefDto).no,
        })}
        onUpload={
          row.original?.status && !isClosed(row.original?.status)
            ? (file: File) => handelUpload(file)
            : undefined
        }
        onClick={e =>
          handleClick(e, `product-development/${row.original.no}`, rowNo)
        }
      />
    </>
  );
};

export default OverviewTableRowContainer;
