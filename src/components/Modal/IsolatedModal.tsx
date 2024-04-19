import { useDisclosure } from '@chakra-ui/hooks';
import { forwardRef, useImperativeHandle } from 'react';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';

export type ModalRef = {
  onOpen: () => void;
  onClose: () => void;
};

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmType?: 'PRIMARY' | 'DELETE';
  cancelText?: string;
  confirmText?: string;
};

const IsolatedModal = forwardRef<ModalRef, Props>(
  (
    {
      title,
      description,
      onConfirm,
      onCancel,
      confirmType = 'PRIMARY',
      cancelText,
      confirmText,
    },
    ref
  ) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    return (
      <Modal isOpen={isOpen} close={onClose} onOverlayClick={onCancel}>
        <ConfirmModal
          title={title}
          description={description}
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

export default IsolatedModal;
