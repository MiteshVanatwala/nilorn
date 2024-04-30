import { IconButton, Image, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { images } from '../../assets';
import { MediaFileDto } from '../../app/generate';

type Props = {
  artwork: MediaFileDto;
  size?: 'SMALL';
};

const ArtworkButton = ({ size, artwork }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip label={`${t('Common.Preview')} ${artwork.name}`}>
      <IconButton
        zIndex={9}
        variant={'ghost'}
        aria-label={t('PD.Artwork')}
        as={'a'}
        target="_blank"
        href={`${artwork.webUrl}`}
        icon={
          <Image
            src={images.pdf}
            height={size === 'SMALL' ? '2.5rem' : '3.2rem'}
            objectFit={'contain'}
            width="auto"
          />
        }
      />
    </Tooltip>
  );
};

export default ArtworkButton;
