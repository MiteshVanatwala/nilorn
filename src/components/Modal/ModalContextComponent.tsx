import { ModalBody } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import Modal from './Modal';

/**
 * Use modal with `ModalContext`.
 */
const ModalContextComponent = () => {
  const { modalContent, isOpen, close, returnFocusOnClose, preventClose } =
    useContext(ModalContext);

  return (
    <Modal
      isOpen={isOpen}
      close={preventClose ? () => false : () => close()}
      returnFocusOnClose={returnFocusOnClose}>
      <ModalBody> {modalContent}</ModalBody>
    </Modal>
  );
};

export default ModalContextComponent;
