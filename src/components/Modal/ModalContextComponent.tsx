import { ModalBody } from '@chakra-ui/react';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import Modal from './Modal';

/**
 * Use modal with `ModalContext`.
 */
const ModalContextComponent = () => {
  const { modalContent, isOpen, close, returnFocusOnClose } =
    useContext(ModalContext);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      returnFocusOnClose={returnFocusOnClose}>
      <ModalBody> {modalContent}</ModalBody>
    </Modal>
  );
};

export default ModalContextComponent;
