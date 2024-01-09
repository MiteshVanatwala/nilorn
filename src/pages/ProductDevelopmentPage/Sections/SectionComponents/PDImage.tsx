import { Flex, Image, Text } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import PDImageModal from './PDImageModal';
import { useGetPDImage } from '../../../../app/api/PDImage';
import { COLORS } from '../../../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  scrolledPast: boolean;
  no: string;
  pdName: string;
};

const PDImage = ({ scrolledPast, no, pdName }: Props) => {
  const { handleModal } = useModal();
  const { t } = useTranslation();

  let { data: pdImage, isError } = useGetPDImage(no);
  if (!isError && pdImage) {
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
            <PDImageModal pdName={pdName} imageUrl={pdImage} no={no} />
          )
        }
        src={`data:image/jpeg;base64,${pdImage}`}
      />
    );
  }
  return (
    <Flex
      maxHeight={scrolledPast ? '0' : '20rem'}
      maxWidth={scrolledPast ? '0' : '20rem'}
      visibility={scrolledPast ? 'hidden' : 'visible'}
      width={'60'}
      height={'60'}
      objectFit={'cover'}
      bg={COLORS.GRAY[5]}
      border={'1px dashed'}
      borderColor={COLORS.GRAY[40]}
      cursor={'pointer'}
      justifyContent={'center'}
      alignItems={'center'}
      onClick={() =>
        handleModal(
          <PDImageModal pdName={pdName} imageUrl={undefined} no={no} />
        )
      }>
      <Text mr="2" as="i" className="ri-add-line" />
      <Text> {t('PD.UploadImage')}</Text>
    </Flex>
  );
};

export default PDImage;
