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

  const location = useLocation();
  const { close } = useModal();
  const { discardChanges, hasUnsavedChanges } = useUnsavedChanges();

  // Only use router blocker if this is NOT a controlled modal
  const shouldUseRouterBlocker = !closeModal;

  const [userConfirmedLeave, setUserConfirmedLeave] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const handleBlockerCallback = useCallback(() => {
    if (isConfirming || userConfirmedLeave) return false;
    return hasUnsavedChanges();
  }, [hasUnsavedChanges, userConfirmedLeave, isConfirming]);

  // Only create blocker if not controlled by parent
  let blocker = useBlocker(
    shouldUseRouterBlocker ? handleBlockerCallback : () => false
  );

  useEffect(() => {
    // Handle controlled modal (when isOpen prop is provided)
    if (!shouldUseRouterBlocker) {
      if (isOpen) {
        modalRef.current?.onOpen();
      } else {
        modalRef.current?.onClose();
      }
      return;
    }

    // Handle automatic router blocker modal
    if (
      blocker &&
      blocker.state === 'blocked' &&
      !modalShown &&
      !isConfirming &&
      !userConfirmedLeave
    ) {
      setModalShown(true);
      modalRef.current?.onOpen();
    }
  }, [
    shouldUseRouterBlocker,
    isOpen,
    blocker,
    blocker?.state,
    modalShown,
    isConfirming,
    userConfirmedLeave,
  ]);

  useEffect(() => {
    close();
    // Only reset states for router blocker mode
    if (shouldUseRouterBlocker) {
      setUserConfirmedLeave(false);
      setIsConfirming(false);
      setModalShown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, shouldUseRouterBlocker]);

  const onConfirm = () => {
    if (shouldUseRouterBlocker && !!blocker.proceed) {
      setIsConfirming(true);
      setUserConfirmedLeave(true);
      setModalShown(false);
      discardChanges();

      // Close modal immediately
      modalRef.current?.onClose();

      // Proceed with navigation immediately
      blocker.proceed?.();
    } else if (closeModal) {
      // Custom modal mode
      modalRef.current?.onClose();
      closeModal(true);
    }
  };

  const onCancel = () => {
    if (closeModal) {
      closeModal(false);
    }
    // Only reset states for router blocker mode
    if (shouldUseRouterBlocker) {
      setIsConfirming(false);
      setUserConfirmedLeave(false);
      setModalShown(false);
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
