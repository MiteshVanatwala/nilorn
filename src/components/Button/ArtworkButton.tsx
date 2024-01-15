import { IconButton, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { images } from '../../assets';
import { downloadFromUrl } from '../../app/utils/file';

type Props = {
  url: string;
  size?: 'SMALL';
};

const ArtworkButton = ({ url, size }: Props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    downloadFromUrl(url);
  };

  return (
    <IconButton
      zIndex={9}
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
