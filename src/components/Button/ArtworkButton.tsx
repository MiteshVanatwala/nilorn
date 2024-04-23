import { IconButton, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { images } from '../../assets';
import { useDownloadFile } from '../../app/api/mediaFile';
import { MediaFileDto } from '../../app/generate';

type Props = {
  artwork: MediaFileDto;
  size?: 'SMALL';
};

const ArtworkButton = ({ size, artwork }: Props) => {
  const { id, name } = artwork;
  const { t } = useTranslation();

  const { downloadFile, isLoading: isDownloading } = useDownloadFile(
    id ?? '',
    name ?? 'artwork.pdf'
  );

  const handleClick = () => {
    // TODO: Preview
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
