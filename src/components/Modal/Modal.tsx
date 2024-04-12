import {
  Modal as ChakraModal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';

import { BORDER_RADIUS, COLORS, SIZES, SPACE } from '../../theme/Constants';

type Props = {
  isOpen: boolean;
  returnFocusOnClose?: boolean;
  close: () => void;
  closeOnEsc?: boolean;
  children: JSX.Element;
};

const Modal = ({
  isOpen,
  close,
  returnFocusOnClose,
  children,
  closeOnEsc = true,
}: Props) => {
  return (
    <ChakraModal
      closeOnEsc={closeOnEsc}
      isOpen={isOpen}
      onClose={closeOnEsc ? close : () => {}}
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
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
