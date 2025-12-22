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
  onOverlayClick?: () => void;
  className?: string;
};

const Modal = ({
  isOpen,
  close,
  returnFocusOnClose,
  children,
  closeOnEsc = true,
  onOverlayClick,
  className,
}: Props) => {
  return (
    <ChakraModal
      closeOnEsc={closeOnEsc}
      onOverlayClick={onOverlayClick}
      isOpen={isOpen}
      onClose={close}
      motionPreset={'scale'}
      isCentered
      returnFocusOnClose={returnFocusOnClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={BORDER_RADIUS.MD}
        minW={'fit-content'}
        className={className}>
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
