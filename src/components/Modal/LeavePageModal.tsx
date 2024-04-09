import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback, useEffect } from 'react';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import { Location, useLocation } from 'react-router';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../app/hooks/useModal';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

type LocationsProps = {
  currentLocation: Location<any>;
  nextLocation: Location<any>;
};

// TODO; Make one leave page compoennt and one blocker.
const LeavePageModal = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
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
    if (blocker && blocker.state === 'blocked' && onOpen) {
      onOpen();
    }
  }, [blocker, onOpen]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Modal
      isOpen={isOpen}
      close={() => {
        onClose();
      }}>
      <ConfirmModal
        title={t('PD.UnsavedChanges')}
        description={t('PD.UnsavedChangesMsg')}
        cancelText={t('Common.No')}
        confirmText={t('Common.Yes')}
        onConfirm={() => {
          (blocker as any).proceed();
          onClose();
          discardChanges();
        }}
        onClose={() => {
          onClose();
        }}
      />
    </Modal>
  );
};

export default LeavePageModal;
