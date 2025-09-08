import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useModal } from '../../app/hooks/useModal';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import IsolatedModal, { ModalRef } from './IsolatedModal';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen?: boolean;
  closeModal?: (accepted?: boolean) => void;
};

const LeavePageBlocker = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const location = useLocation();
  const { close } = useModal();
  const { discardChanges, hasUnsavedChanges } = useUnsavedChanges();

  // Determine which mode we're in
  const isCustomModalMode = closeModal !== undefined;
  const isRouterBlockerMode = !isCustomModalMode;

  const handleBlockerCallback = useCallback(() => {
    // Only block in router mode and when not processing
    if (!isRouterBlockerMode || isProcessing) return false;
    const shouldBlock = hasUnsavedChanges();
    return shouldBlock;
  }, [hasUnsavedChanges, isProcessing, isRouterBlockerMode, closeModal]);

  useEffect(() => {
    if (isCustomModalMode) {
      // Custom modal mode - controlled by parent
      if (isOpen) {
        setIsModalOpen(true);
        modalRef.current?.onOpen();
      } else if (isOpen === false) {
        setIsModalOpen(false);
        modalRef.current?.onClose();
      }
    }
  }, [isOpen, isCustomModalMode]);

  // Only create blocker in router mode
  let blocker = useBlocker(
    isRouterBlockerMode ? handleBlockerCallback : () => false
  );

  useEffect(() => {
    if (
      isRouterBlockerMode &&
      blocker &&
      blocker.state === 'blocked' &&
      !isModalOpen &&
      !isProcessing
    ) {
      setIsModalOpen(true);
      modalRef.current?.onOpen();
    }
  }, [
    blocker,
    blocker?.state,
    isModalOpen,
    isProcessing,
    isRouterBlockerMode,
    hasUnsavedChanges,
  ]);

  useEffect(() => {
    close();
    // Only reset states in router blocker mode
    if (isRouterBlockerMode) {
      setIsModalOpen(false);
      setIsProcessing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isRouterBlockerMode]);

  const onConfirm = () => {
    if (isRouterBlockerMode && !!blocker.proceed) {
      // Router blocker mode
      setIsProcessing(true);
      setIsModalOpen(false);
      discardChanges();
      modalRef.current?.onClose();

      // Use setTimeout to ensure state updates before proceeding
      setTimeout(() => {
        blocker.proceed?.();
      }, 0);
    } else if (isCustomModalMode && closeModal) {
      // Custom modal mode
      setIsModalOpen(false);
      modalRef.current?.onClose();
      closeModal(true);
    }
  };

  const onCancel = () => {
    setIsModalOpen(false);
    modalRef.current?.onClose();

    if (isRouterBlockerMode && blocker && blocker.reset) {
      // Reset the blocker to allow it to work properly on next navigation attempt
      blocker.reset();
    }

    if (isCustomModalMode && closeModal) {
      closeModal(false);
    }
  };

  return (
    <IsolatedModal
      ref={modalRef}
      title={t('PD.UnsavedChanges')}
      description={t('PD.UnsavedChangesMsg')}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default LeavePageBlocker;
