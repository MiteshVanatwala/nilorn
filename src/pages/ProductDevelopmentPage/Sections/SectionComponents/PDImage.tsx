import { Image } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import PDImageModal from './PDImageModal';

type Props = {
  imageUrl: string;
  scrolledPast: boolean;
  no: string;
};

const PDImage = ({ imageUrl, scrolledPast, no }: Props) => {
  const { handleModal } = useModal();

  return (
    <Image
      maxHeight={scrolledPast ? '0' : '20rem'}
      maxWidth={scrolledPast ? '0' : '20rem'}
      visibility={scrolledPast ? 'hidden' : 'visible'}
      width={'60'}
      height={'60'}
      objectFit={'cover'}
      cursor={'pointer'}
      onClick={() => handleModal(<PDImageModal imageUrl={imageUrl} no={no} />)}
      src={imageUrl}></Image>
  );
};

export default PDImage;
