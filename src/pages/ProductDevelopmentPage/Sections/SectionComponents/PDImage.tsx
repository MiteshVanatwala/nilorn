import { Flex, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ROLES_ALLOWED_TO_UPLOAD_FILE } from '../../../../app/Permissions/Permissions';
import { useGetPDImage } from '../../../../app/api/PDImage';
import { useCurrentUser } from '../../../../app/api/User';
import { Status } from '../../../../app/generate';
import { useModal } from '../../../../app/hooks/useModal';
import { isClosed } from '../../../../app/utils/status';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import { COLORS } from '../../../../theme/Constants';
import PDImageModal from './PDImageModal';

type Props = {
  scrolledPast: boolean;
  no: string;
  pdName: string;
  disableEdit: boolean;
  status: Status;
};

const PDImage = ({ scrolledPast, no, pdName, disableEdit, status }: Props) => {
  const { handleModal } = useModal();
  const { t } = useTranslation();
  let { data: pdImage, isError } = useGetPDImage(no);
  const { data: user } = useCurrentUser();
  const allowedToUploadImg =
    user?.role &&
    ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) &&
    !isClosed(status);
  function handleModalFunc() {
    if (allowedToUploadImg) {
      handleModal(
        <PDImageModal
          pdName={pdName}
          imageUrl={pdImage}
          no={no}
          status={status}
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
              status={status}
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
      cursor={allowedToUploadImg ? 'pointer' : 'default'}
      justifyContent={'center'}
      alignItems={'center'}
      onClick={() => handleModalFunc()}>
      {user?.role && ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user.role) && (
        <>
          <RemixIcon component="Text" mr="2" icon="ADD_LINE" />
          <Text>{t('PD.UploadImage')}</Text>
        </>
      )}
    </Flex>
  );
};

export default PDImage;
