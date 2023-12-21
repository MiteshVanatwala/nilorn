import { useTranslation } from 'react-i18next';
import { Image } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import PDImageModal from './PDImageModal';
import { useState } from 'react';

type Props = {
  imageUrl: string;
  scrolledPast: boolean;
};

const PDImage = ({ imageUrl, scrolledPast }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  const [pdImage, setPdImage] = useState<string>(imageUrl);

  const uploadPDImage = (uploaded: string[]) => {
    console.log('uploaded', uploaded);
    // setPdImage(uploaded);
  };

  return (
    <Image
      maxHeight={scrolledPast ? '0' : '20rem'}
      maxWidth={scrolledPast ? '0' : '20rem'}
      visibility={scrolledPast ? 'hidden' : 'visible'}
      width={'60'}
      height={'60'}
      objectFit={'cover'}
      cursor={'pointer'}
      onClick={() =>
        handleModal(
          <PDImageModal imageUrl={pdImage} onUpload={uploadPDImage} />
        )
      }
      src={imageUrl}></Image>
  );
};

export default PDImage;
