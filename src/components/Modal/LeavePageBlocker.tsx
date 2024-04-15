import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useModal } from '../../app/hooks/useModal';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
import LeavePageModal, { ModalRef } from './LeavePageModal';
import { LocationsProps } from '../../app/types/types';

const LeavePageBlocker = () => {
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
    if (blocker && blocker.state === 'blocked' && modalRef.current?.onOpen()) {
      console.log('blocker.state', blocker.state);
      modalRef.current.onOpen();
    }
  }, [blocker]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onConfirm = () => {
    discardChanges();
    (blocker as any).proceed();
    modalRef.current?.onClose();
  };

  return <LeavePageModal ref={modalRef} onConfirm={onConfirm} />;
};

export default LeavePageBlocker;
