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
  confirmType?: 'DELETE' | 'PRIMARY';
  cancelText?: string;
  confirmText?: string;
};

const LeavePageModal = forwardRef<ModalRef, Props>(
  (
    {
      title,
      description,
      onConfirm,
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
      <Modal isOpen={isOpen} close={onClose}>
        <ConfirmModal
          title={title}
          description={description}
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
