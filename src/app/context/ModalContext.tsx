import { createContext, ReactNode, useState } from 'react';
import ModalContextCompoent from '../../components/Modal/ModalContextCompoent';

type ModalContextType = {
  handleModal: (content?: JSX.Element, returnFocusOnClose?: boolean) => void;
  close: () => void;
  modalContent?: JSX.Element | boolean;
  isOpen: boolean;
  returnFocusOnClose?: boolean;
};

const defaultState = {
  isOpen: false,
  close: () => {},
  handleModal: (content?: JSX.Element, returnFocusOnClose?: boolean) => {},
  modalContent: false,
  returnFocusOnClose: true,
};

const ModalContext = createContext<ModalContextType>(defaultState);

type ModalProviderType = {
  children: ReactNode;
};

function useModal() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element | boolean>();
  const [returnFocusOnClose, setReturnFocusOnClose] = useState<boolean>();

  const handleModal = (
    content: JSX.Element | boolean = false,
    returnFocusOnClose: boolean = true
  ) => {
    if (content) {
      setOpen(true);
      setModalContent(content);
      setReturnFocusOnClose(returnFocusOnClose);
    }
  };

  const close = () => {
    setOpen(false);
  };

  return {
    isOpen,
    handleModal,
    modalContent,
    close,
    returnFocusOnClose,
  };
}

/**
 *  @deprecated
 */
const ModalProvider = ({ children }: ModalProviderType) => {
  const { isOpen, handleModal, modalContent, close, returnFocusOnClose } =
    useModal();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        handleModal,
        modalContent,
        close,
        returnFocusOnClose,
      }}>
      {children}
      <ModalContextCompoent />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
