import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { HStack, Text } from '@chakra-ui/layout';
import { ModalBody, ModalFooter } from '@chakra-ui/modal';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteMediaFile } from '../../app/api/mediaFile';
import { SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import { ModalRef } from '../Modal/IsolatedModal';
import Modal from '../Modal/Modal';
import ModalHeading from '../Modal/ModalHeading';

type Props = { id: string; onRemove: (id: string) => void };

const RemoveFileModal = forwardRef<ModalRef, Props>(({ id, onRemove }, ref) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    mutate: deleteFile,
    isLoading: isDeleting,
    isSuccess: isDeleted,
    error: deleteError,
  } = useDeleteMediaFile(id);
  const {
    mutate: removeLink,
    isLoading: isRemovingLink,
    isSuccess: isLinkRemoved,
    error: removeLinkError,
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

  useEffect(() => {
    if (deleteError?.status === 410 || removeLinkError?.status === 410) {
      onRemove(id);
    }
  }, [deleteError?.status, removeLinkError?.status, id, onRemove]);

  return (
    <Modal isOpen={isOpen} close={onClose} onOverlayClick={onClose}>
      <ModalBody>
        <ModalHeading mb={'0'} textAlign="center" title={t('PD.DeleteTitle')} />
        <ModalBody px={0}>
          <Text textAlign={'center'}>{t('PD.File.DeleteFile')}</Text>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <HStack spacing={SPACE.LG} marginTop={SPACE.MD}>
            <Button
              onClick={() => deleteFile(false)}
              isLoading={isDeleting}
              variant={'deleteBtn'}
              rightIcon={<RemixIcon component="i" icon="DELETE_BIN_LINE" />}>
              {t('PD.File.Delete')}
            </Button>
            <Button
              onClick={() => removeLink(true)}
              isLoading={isRemovingLink}
              variant={'primary'}
              rightIcon={<RemixIcon component="i" icon="LINK_UNLINK_M" />}>
              {t('PD.File.RemoveLink')}
            </Button>
            <Button
              variant={'secondary'}
              onClick={onClose}
              rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}>
              {t('Common.Cancel')}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
});
export default RemoveFileModal;
