import { Flex, Image, Text } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
import PDImageModal from './PDImageModal';
import { COLORS } from '../../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useGetPDImage } from '../../../../app/api/PDImage';
import { useCurrentUser } from '../../../../app/api/User';
import { ROLES_ALLOWED_TO_UPLOAD_FILE } from '../../../../app/Permissions/Permissions';

type Props = {
  scrolledPast: boolean;
  no: string;
  pdName: string;
  disableEdit: boolean;
};

const PDImage = ({ scrolledPast, no, pdName, disableEdit }: Props) => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  let { data: pdImage, isError } = useGetPDImage(no);
  const { data: user } = useCurrentUser();

  function handleModalFunc() {
    if (user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role)) {
      handleModal(
        <PDImageModal
          pdName={pdName}
          imageUrl={pdImage}
          no={no}
          disableEdit={disableEdit}
        />
      );
    }
  }

  if (pdImage && !isError) {
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
            <PDImageModal
              pdName={pdName}
              imageUrl={pdImage}
              no={no}
              disableEdit={disableEdit}
            />
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
      cursor={
        user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role)
          ? 'pointer'
          : 'default'
      }
      justifyContent={'center'}
      alignItems={'center'}
      onClick={() => handleModalFunc()}>
      {user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) && (
        <>
          <Text mr="2" as="i" className="ri-add-line" />
          <Text>{t('PD.UploadImage')}</Text>
        </>
      )}
    </Flex>
  );
};

export default PDImage;
