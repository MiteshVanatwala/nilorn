import { IconButton, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { images } from '../../assets';
import { useDownloadFile } from '../../app/api/mediaFile';
// import { downloadFromUrl } from '../../app/utils/file';

type Props = {
  id: string;
  size?: 'SMALL';
};

const ArtworkButton = ({ id, size }: Props) => {
  const { t } = useTranslation();

  const { downloadFile, isLoading: isDownloading } = useDownloadFile(
    id,
    'artwork.pdf'
  ); // TODO: Get artwork name?

  const handleClick = () => {
    downloadFile();
  };

  return (
    <IconButton
      zIndex={9}
      isLoading={isDownloading}
      variant={'ghost'}
      aria-label={t('PD.Artwork')}
      onClick={e => {
        e.stopPropagation();
        handleClick();
      }}
      icon={
        <Image
          src={images.pdf}
          height={size === 'SMALL' ? '2.5rem' : '3.2rem'}
          objectFit={'contain'}
          width="auto"
        />
      }
    />
  );
};

export default ArtworkButton;
