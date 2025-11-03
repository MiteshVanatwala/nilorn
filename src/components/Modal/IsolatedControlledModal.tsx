import React, { useEffect } from 'react';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmType?: 'PRIMARY' | 'DELETE';
  cancelText?: string;
  confirmText?: string;
  isConfirmLoading?: boolean;
};

const IsolatedControlledModal = ({
  title,
  isOpen,
  onClose,
  description,
  onConfirm,
  onCancel,
  confirmType = 'PRIMARY',
  cancelText,
  confirmText,
  isConfirmLoading,
}: Props) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        if (onCancel) {
          onCancel();
        } else {
          onClose();
        }
      }
    };

    // Use capture phase to intercept before Chakra Modal handles it
    window.addEventListener('keydown', handleEscKey, true);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey, true);
    };
  }, [isOpen, onCancel, onClose]);

  const handleClose = () => {
    // This is called by Chakra Modal's onClose, but Esc should be handled by the event listener above
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      onOverlayClick={onCancel}
      className="exit-confirmation-modal">
      <ConfirmModal
        title={title}
        description={description}
        onConfirm={onConfirm}
        onClose={() => {
          // Only call onCancel when user explicitly cancels
          if (onCancel) {
            onCancel();
          }
        }}
        confirmType={confirmType}
        cancelText={cancelText}
        confirmText={confirmText}
        isConfirmLoading={isConfirmLoading}
      />
    </Modal>
  );
};

export default IsolatedControlledModal;
