import { Row } from '@tanstack/react-table';
import { TBodyRow } from '../../components/Table/TBodyRow';
import { useNavigate } from 'react-router';
import { MediaFileType, ProductDevelopmentBriefDto } from '../../app/generate';
import { MouseEvent, useRef, useState } from 'react';
import { ARTWORK_FILE_TYPE, SESSION_STORAGE } from '../../app/utils/constant';
import { isClosed } from '../../app/utils/status';
import { useTranslation } from 'react-i18next';
import IsolatedModal, { ModalRef } from '../../components/Modal/IsolatedModal';
import { useToast } from '../../app/hooks/useToast';
import { useUploadFile } from '../../app/api/mediaFile';

type Props = {
  no: string;
  row: Row<ProductDevelopmentBriefDto>;
  bgColor?: string;
};

const OverviewTableRowContainer = ({ no, row, bgColor }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const modalRef = useRef<ModalRef>(null);

  const { artwork } = row.original;

  const [file, setFile] = useState<File | undefined>(undefined);
  const { mutate: upload, isLoading } = useUploadFile(
    no,
    MediaFileType.ARTWORK,
    row.original?.status
  );

  const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
    e.stopPropagation();
    const path = window.location.pathname ?? '/';
    const search = window.location.search;
    sessionStorage.setItem(SESSION_STORAGE.BACK_LINK, path + search);
    sessionStorage.setItem(
      SESSION_STORAGE.PREV_FILTER_OVERVIEW,
      window.location.search
    );
    navigate(`product-development/${no}`);
  };

  const handelUpload = (file: File) => {
    if (file.type === ARTWORK_FILE_TYPE) {
      if (!!artwork) {
        modalRef.current?.onOpen();
        setFile(file);
      } else if (!!no) {
        uploadFile(file, false);
      }
    } else {
      showToast({
        status: 'info',
        description: t('PD.File.Feedback.Info.ArtworkUploadType'),
      });
    }
  };

  const uploadFile = async (file: File, replaceArtwork: boolean) => {
    modalRef.current?.onClose();
    upload({ file, replaceArtwork });
  };

  return (
    <>
      <IsolatedModal
        ref={modalRef}
        title={t('PD.File.ReplaceArtworkTitle')}
        description={t('PD.File.ReplaceArtworkDescription')}
        onConfirm={() => file && uploadFile(file, true)}
      />
      <TBodyRow
        row={row}
        id={no}
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
        acceptFileType={ARTWORK_FILE_TYPE}
        onClick={e => handleClick(e)}
      />
    </>
  );
};

export default OverviewTableRowContainer;
