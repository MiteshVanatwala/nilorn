import { useTranslation } from 'react-i18next';
import { Image } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';

type Props = {
  imageUrl: string;
  scrolledPast: boolean;
};

const PDImage = ({ imageUrl, scrolledPast }: Props) => {
  const { t } = useTranslation();
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
      onClick={() => handleModal(<h2>hej</h2>)}
      src={imageUrl}></Image>
  );
};

export default PDImage;
