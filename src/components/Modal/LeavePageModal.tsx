import { useDisclosure } from '@chakra-ui/hooks';
import { forwardRef, useImperativeHandle } from 'react';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import { useTranslation } from 'react-i18next';

export type ModalRef = {
  onOpen: () => void;
  onClose: () => void;
};

type Props = {
  onConfirm: () => void;
  confirmType?: 'PRIMARY';
  cancelText?: string;
  confirmText?: string;
};

const LeavePageModal = forwardRef<ModalRef, Props>(
  ({ onConfirm, confirmType = 'PRIMARY', cancelText, confirmText }, ref) => {
    const { t } = useTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    return (
      <Modal isOpen={isOpen} close={onClose}>
        <ConfirmModal
          title={t('PD.UnsavedChanges')}
          description={t('PD.UnsavedChangesMsg')}
          onConfirm={onConfirm}
          onClose={onClose}
          confirmType={confirmType}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      </Modal>
    );
  }
);

export default LeavePageModal;
