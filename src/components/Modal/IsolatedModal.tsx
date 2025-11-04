import { useDisclosure } from '@chakra-ui/hooks';
import { forwardRef, useImperativeHandle, useEffect } from 'react';
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
  isConfirmLoading?: boolean;
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
      isConfirmLoading,
    },
    ref
  ) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    // Handle Esc key manually to prevent conflicts with parent modals
    useEffect(() => {
      if (!isOpen) return;

      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          if (onCancel) {
            onCancel();
          }
          onClose();
        }
      };

      // Use capture phase to intercept before other handlers
      window.addEventListener('keydown', handleEscKey, true);
      
      return () => {
        window.removeEventListener('keydown', handleEscKey, true);
      };
    }, [isOpen, onCancel, onClose]);

    return (
      <Modal
        isOpen={isOpen}
        close={() => {
          onCancel?.();
          onClose();
        }}
        closeOnEsc={false} // Disable Chakra's Esc handling to prevent conflicts with parent modal
        onOverlayClick={onCancel}
        className="exit-confirmation-modal">
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
          isConfirmLoading={isConfirmLoading}
        />
      </Modal>
    );
  }
);

export default IsolatedModal;
