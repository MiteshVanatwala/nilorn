import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import IsolatedModal, { ModalRef } from '../../components/Modal/IsolatedModal';
import { useUnsavedChanges } from './useUnsavedChanges';

export const useUnsavedChangesModal = (onDiscardCallback?: () => void) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const { hasUnsavedChanges, discardChanges } = useUnsavedChanges();

  const onConfirmDiscard = useCallback(() => {
    discardChanges();
    modalRef.current?.onClose();
    onDiscardCallback?.();
  }, [discardChanges, onDiscardCallback]);

  const onOpen = useCallback(() => {
    modalRef.current?.onOpen();
  }, []);

  const onClose = useCallback(() => {
    modalRef.current?.onClose();
  }, []);

  const modal = useMemo(
    () => (
      <IsolatedModal
        ref={modalRef}
        title={t('PD.UnsavedChanges')}
        description={t('PD.UnsavedChangesMsg')}
        onConfirm={onConfirmDiscard}
      />
    ),
    [t, onConfirmDiscard]
  );

  return { modal, hasUnsavedChanges, onOpen, onClose };
};
