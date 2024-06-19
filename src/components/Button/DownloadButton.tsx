import { IconButton, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import RemixIcon from '../Icon/RemixIcon';
import { DownloadFileType, Method } from '../../app/types/types';

type Props = {
  filetype: DownloadFileType;
  fileId: string;
  fileName: string;
  disabled?: boolean;
  tooltipText?: string;
  method?: Method;
};

const DownloadButton = ({
  filetype,
  fileId,
  fileName,
  tooltipText,
  method = Method.GET,
}: Props) => {
  const { t } = useTranslation();
  const { isLoading, downloadFile } = useDownloadFile();

  const buttonComponent = (
    <IconButton
      variant={'ghost'}
      aria-label={t('Common.Download')}
      onClick={() => downloadFile(filetype, fileId, fileName, method)}
      isLoading={isLoading}
      icon={<RemixIcon component="i" icon="DOWNLOAD_LINE" />}
    />
  );

  if (tooltipText) {
    return <Tooltip label={tooltipText}>{buttonComponent}</Tooltip>;
  }

  return buttonComponent;
};

export default DownloadButton;
