import {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useUnsavedChanges } from './useUnsavedChanges';
import IsolatedModal, { ModalRef } from '../../components/Modal/IsolatedModal';
import useModalNavigationBlocker from './useModalNavigationBlocker';
import { ModalContext } from '../context/ModalContext';
import { useOutsideClick } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const useModalFormHelper = (
  outsideRef: RefObject<HTMLElement>,
  initNavId: string = '',
  preventOutsideClick?: boolean
) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const {
    isBlocked,
    proceedBlocker,
    setBlocked: setBlockedRoute,
    resetBlocker,
    setBlocked,
  } = useModalNavigationBlocker(true);

  const { close, setPreventClose } = useContext(ModalContext);
  const { discardChanges, hasUnsavedChanges, setUnsavedChanges } =
    useUnsavedChanges();

  const [activeNavId, setActiveNavId] = useState<string>(initNavId);
  const [isLeavePageModalOpen, setLeavePageModalOpen] =
    useState<boolean>(false);
  const [pendingNavId, setPendingNavId] = useState<string | undefined>(
    undefined
  );

  const openLeavePageModal = useCallback(() => {
    modalRef.current?.onOpen();
    setLeavePageModalOpen(true);
  }, []);

  useEffect(() => {
    if (isBlocked && hasUnsavedChanges()) {
      if (!isLeavePageModalOpen) {
        openLeavePageModal();
        setBlocked(false);
      }
    } else if (isBlocked) {
      proceedBlocker();
      close();
      setBlockedRoute(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    close,
    hasUnsavedChanges,
    isBlocked,
    openLeavePageModal,
    proceedBlocker,
    setBlockedRoute,
  ]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (hasUnsavedChanges() && e.key === 'Escape') {
        if (!isLeavePageModalOpen) openLeavePageModal();
        else setLeavePageModalOpen(false);
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
      if (!preventOutsideClick) {
        if (hasUnsavedChanges()) {
          openLeavePageModal();
          setPreventClose(true);
        } else {
          close();
        }
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
    setLeavePageModalOpen(false);
    discardChanges();
    proceedBlocker();
    if (pendingNavId) {
      setActiveNavId(pendingNavId);
      modalRef.current?.onClose();
    } else {
      close();
    }
  };

  const onCancel = () => {
    resetBlocker();
    setBlockedRoute(false);
    setPendingNavId(undefined);
    setLeavePageModalOpen(false);
  };

  const setDirty = (isDirty: boolean) => {
    setUnsavedChanges(isDirty);
    setPreventClose(isDirty);
  };

  const leavePageModal = (
    <IsolatedModal
      ref={modalRef}
      title={t('PD.UnsavedChanges')}
      description={t('PD.UnsavedChangesMsg')}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );

  return {
    activeNavId,
    leavePageModal,
    onNavigate,
    setDirty,
  };
};

export default useModalFormHelper;
