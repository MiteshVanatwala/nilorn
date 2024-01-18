import { ModalFooter, ModalBody, Button, HStack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../../../app/context/ModalContext';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import { SPACE } from '../../../../theme/Constants';
import { NavLink } from 'react-router-dom';
type Props = { to: string };

const UnsavedChangesModal = ({ to }: Props) => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);

  return (
    <>
      <ModalBody>
        <ModalHeading
          mb={SPACE.XS}
          textAlign="center"
          title={t('PD.UnsavedChanges')}
        />
        <Text textAlign={'center'} maxW={'40rem'}>
          {t('PD.UnsavedChangesMsg')}
        </Text>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.MD} marginTop={SPACE.XS}>
          <Button
            as={NavLink}
            to={to}
            type="submit"
            variant={'primary'}
            onClick={() => {
              close();
            }}>
            {t('Common.Yes')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => {
              close();
            }}>
            {t('Common.No')}
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
export default UnsavedChangesModal;
