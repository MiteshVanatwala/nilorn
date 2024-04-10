import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import ModalContextComponent from '../../components/Modal/ModalContextComponent';

type ModalContextType = {
  handleModal: (content?: JSX.Element, returnFocusOnClose?: boolean) => void;
  close: () => void;
  modalContent?: JSX.Element | boolean;
  isOpen: boolean;
  returnFocusOnClose?: boolean;
  preventClose: boolean;
  setPreventClose: Dispatch<SetStateAction<boolean>>;
};

const defaultState = {
  isOpen: false,
  close: () => {},
  handleModal: (content?: JSX.Element, returnFocusOnClose?: boolean) => {},
  modalContent: false,
  returnFocusOnClose: true,
  preventClose: false,
  setPreventClose: () => {},
};

const ModalContext = createContext<ModalContextType>(defaultState);

type ModalProviderType = {
  children: ReactNode;
};

function useModal() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element | boolean>();
  const [returnFocusOnClose, setReturnFocusOnClose] = useState<boolean>();
  const [preventClose, setPreventClose] = useState<boolean>(false);

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
    preventClose,
    setPreventClose,
  };
}

/**
 *  @deprecated
 */
const ModalProvider = ({ children }: ModalProviderType) => {
  const {
    isOpen,
    handleModal,
    modalContent,
    close,
    returnFocusOnClose,
    preventClose,
    setPreventClose,
  } = useModal();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        handleModal,
        modalContent,
        close,
        returnFocusOnClose,
        preventClose,
        setPreventClose,
      }}>
      {children}
      <ModalContextComponent />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
