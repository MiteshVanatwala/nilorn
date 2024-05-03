import { ModalBody, ModalFooter } from '@chakra-ui/modal';
import ModalHeading from '../Modal/ModalHeading';
import { HStack, Text } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { ModalRef } from '../Modal/IsolatedModal';
import { useDeleteMediaFile } from '../../app/api/mediaFile';

type Props = { id: string; onRemove: (id: string) => void };

const RemoveFileModal = forwardRef<ModalRef, Props>(({ id, onRemove }, ref) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    mutateAsync: deleteFile,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteMediaFile(id);
  const {
    mutateAsync: removeLink,
    isLoading: isRemovingLink,
    isSuccess: isLinkRemoved,
  } = useDeleteMediaFile(id);

  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  useEffect(() => {
    if (isLinkRemoved || isDeleted) {
      onRemove(id);
    }
  }, [id, isDeleted, isLinkRemoved, onRemove]);

  return (
    <Modal isOpen={isOpen} close={onClose} onOverlayClick={onClose}>
      <ModalBody>
        <ModalHeading mb={'0'} textAlign="center" title={t('PD.DeleteTitle')} />
        <ModalBody px={0}>
          <Text textAlign={'center'}>{t('PD.DeleteFile')}</Text>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <HStack spacing={SPACE.LG} marginTop={SPACE.MD}>
            <Button
              onClick={() => deleteFile(false)}
              isLoading={isDeleting}
              variant={'deleteBtn'}
              rightIcon={<i className="ri-delete-bin-line" />}>
              {t('PD.File.Delete')}
            </Button>
            <Button
              onClick={() => removeLink(true)}
              isLoading={isRemovingLink}
              variant={'secondary'}
              rightIcon={<i className="ri-link-unlink-m" />}>
              {t('PD.File.RemoveLink')}
            </Button>
            <Button variant={'secondary'} onClick={onClose}>
              {t('Common.Cancel')}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
});
export default RemoveFileModal;
