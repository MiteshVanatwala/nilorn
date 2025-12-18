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
  return (
    <Modal
      isOpen={isOpen}
      close={onClose}
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
};

export default IsolatedControlledModal;
