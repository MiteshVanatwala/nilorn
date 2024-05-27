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
  } = useModalNavigationBlocker(true);

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
      proceedBlocker();
      close();
      setBlockedRoute(false);
    }
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
    modalRef.current?.onClose();
    discardChanges();
    if (pendingNavId) {
      setActiveNavId(pendingNavId);
    } else {
      close();
      proceedBlocker();
    }
  };

  const onCancel = () => {
    setBlockedRoute(false);
    setPendingNavId(undefined);
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
