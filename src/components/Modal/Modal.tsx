import {
  Modal as ChakraModal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { BORDER_RADIUS, COLORS, SIZES, SPACE } from '../../theme/Constants';

/**
 * Use modal with `ModalContext`.
 */
const Modal = () => {
  const { modalContent, isOpen, close, returnFocusOnClose } =
    useContext(ModalContext);

  return (
    <>
      <ChakraModal
        isOpen={isOpen}
        onClose={close}
        motionPreset={'scale'}
        isCentered
        returnFocusOnClose={returnFocusOnClose}>
        <ModalOverlay />
        <ModalContent borderRadius={BORDER_RADIUS.MD} minW={'fit-content'}>
          <ModalHeader
            background={COLORS.GRAY[90]}
            padding={SPACE.LG}
            borderTopLeftRadius={BORDER_RADIUS.MD}
            borderTopRightRadius={BORDER_RADIUS.MD}
          />
          <ModalCloseButton
            color={COLORS.WHITE}
            size={SIZES.ICON.LG}
            mt={SPACE.SM}
            mr={SPACE.SM}
          />
          <ModalBody position={'relative'}>{modalContent}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;
