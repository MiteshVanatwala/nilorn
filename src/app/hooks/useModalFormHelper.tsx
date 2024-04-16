import {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useUnsavedChanges } from './useUnsavedChanges';
import LeavePageModal, {
  ModalRef,
} from '../../components/Modal/LeavePageModal';
import useCloseModalOnNavigation from './useCloseModalOnNavigation';
import { ModalContext } from '../context/ModalContext';
import { useOutsideClick } from '@chakra-ui/react';

const useModalFormHelper = (
  outsideRef: RefObject<HTMLElement>,
  initNavId: string = ''
) => {
  const modalRef = useRef<ModalRef>(null);

  const isBlocked = useCloseModalOnNavigation(true);

  const { close, setPreventClose } = useContext(ModalContext);
  const { discardChanges, hasUnsavedChanges, setUnsavedChanges } =
    useUnsavedChanges();

  const [activeNavId, setActiveNavId] = useState<string>(initNavId);
  const [pendingNavId, setPendingNavId] = useState<string | undefined>(
    undefined
  );

  const openLeavePageModal = useCallback(() => {
    modalRef.current?.onOpen();
  }, []);

  useEffect(() => {
    if (isBlocked && hasUnsavedChanges()) {
      openLeavePageModal();
    } else if (isBlocked) {
      close();
    }
  }, [close, hasUnsavedChanges, isBlocked, openLeavePageModal]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (hasUnsavedChanges() && e.key === 'Escape') {
        openLeavePageModal();
        setPendingNavId(undefined);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  useOutsideClick({
    ref: outsideRef,
    handler: () => {
      if (hasUnsavedChanges()) {
        openLeavePageModal();
        setPreventClose(true);
      } else {
        close();
      }
    },
  });

  useEffect(() => {
    setPendingNavId(undefined);
  }, [activeNavId]);

  const onNavigate = (productionNavigation: string) => {
    setPendingNavId(productionNavigation);

    if (hasUnsavedChanges()) {
      openLeavePageModal();
    } else {
      setActiveNavId(productionNavigation);
    }
  };

  useEffect(() => {
    setPendingNavId(undefined);
  }, [activeNavId]);

  const onConfirm = () => {
    setPreventClose(false);
    modalRef.current?.onClose();
    discardChanges();
    if (pendingNavId) {
      setActiveNavId(pendingNavId);
    } else {
      close();
    }
  };

  const onCancel = () => {
    setPendingNavId(undefined);
  };

  const setDirty = (isDirty: boolean) => {
    setUnsavedChanges(isDirty);
    setPreventClose(isDirty);
  };

  const leavePageModal = (
    <LeavePageModal ref={modalRef} onConfirm={onConfirm} onCancel={onCancel} />
  );

  return {
    activeNavId,
    leavePageModal,
    onNavigate,
    setDirty,
  };
};

export default useModalFormHelper;
