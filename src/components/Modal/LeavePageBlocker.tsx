import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useModal } from '../../app/hooks/useModal';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import IsolatedModal, { ModalRef } from './IsolatedModal';
import { LocationsProps } from '../../app/types/types';
import { useTranslation } from 'react-i18next';

const LeavePageBlocker = () => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const location = useLocation();
  const { close } = useModal();
  const { discardChanges, hasUnsavedChanges } = useUnsavedChanges();

  const handleBlockerCallback = useCallback(
    () =>
      ({ currentLocation, nextLocation }: LocationsProps) =>
        hasUnsavedChanges() &&
        currentLocation.pathname !== nextLocation.pathname,
    [hasUnsavedChanges]
  );

  let blocker = useBlocker(handleBlockerCallback());

  useEffect(() => {
    if (blocker && blocker.state === 'blocked') {
      modalRef.current?.onOpen();
    }
  }, [blocker, blocker?.state]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onConfirm = () => {
    if (typeof (blocker as any).proceed === 'function') {
      discardChanges();
      (blocker as any).proceed();
      modalRef.current?.onClose();
    }
  };

  return (
    <IsolatedModal
      ref={modalRef}
      title={t('PD.UnsavedChanges')}
      description={t('PD.UnsavedChangesMsg')}
      onConfirm={onConfirm}
    />
  );
};

export default LeavePageBlocker;
