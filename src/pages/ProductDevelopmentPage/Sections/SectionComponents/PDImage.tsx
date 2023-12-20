import { useTranslation } from 'react-i18next';
import { Image } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import PDImageModal from './PDImageModal';

type Props = {
  imageUrl: string;
  scrolledPast: boolean;
};
const uploadPDImage = (uploaded: string[]) => {
  console.log('uploaded', uploaded);
};
const PDImage = ({ imageUrl, scrolledPast }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();
  imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Gavle_goat_2019.jpg';
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
          <PDImageModal imageUrl={imageUrl} onUpload={uploadPDImage} />
        )
      }
      src={imageUrl}></Image>
  );
};

export default PDImage;
