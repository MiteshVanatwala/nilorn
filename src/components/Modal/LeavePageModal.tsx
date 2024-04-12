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
  onCancel?: () => void;
  confirmType?: 'PRIMARY';
  cancelText?: string;
  confirmText?: string;
};

const LeavePageModal = forwardRef<ModalRef, Props>(
  (
    { onConfirm, onCancel, confirmType = 'PRIMARY', cancelText, confirmText },
    ref
  ) => {
    const { t } = useTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    return (
      <Modal isOpen={isOpen} close={onClose} onOverlayClick={onCancel}>
        <ConfirmModal
          title={t('PD.UnsavedChanges')}
          description={t('PD.UnsavedChangesMsg')}
          onConfirm={onConfirm}
          onClose={() => {
            if (onCancel) {
              onCancel();
            }
            onClose();
          }}
          confirmType={confirmType}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      </Modal>
    );
  }
);

export default LeavePageModal;
