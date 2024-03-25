import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useModal } from './useModal';
import LeavePageModal, {
  ModalRef,
} from '../../components/Modal/LeavePageModal';

const IS_DIRTY = 'isDirty';

export function useUnsavedChanges() {
  const { t } = useTranslation();

  const { close } = useModal();
  const modalRef = useRef<ModalRef>(null);
  const [pathToNavigate, setPathToNavigate] = useState('');

  const navigate = useNavigate();

  function setUnsavedChanges(isDirty: boolean) {
    sessionStorage.setItem(IS_DIRTY, isDirty.toString());
  }

  function discardChanges() {
    close();
    setUnsavedChanges(false);
    modalRef.current?.onClose();
    navigate(pathToNavigate);
    return;
  }

  function openModal(path: string) {
    setPathToNavigate(path);
    modalRef.current?.onOpen();
  }

  function onLeavePage(path: string) {
    if (hasUnsavedChanges()) {
      return openModal(`${path}`);
    }
    close();
    setUnsavedChanges(false);
    return navigate(path);
  }

  function hasUnsavedChanges() {
    return sessionStorage.getItem(IS_DIRTY) === 'true';
  }

  const modalComponent = (
    <LeavePageModal
      ref={modalRef}
      title={t('PD.UnsavedChanges')}
      description={t('PD.UnsavedChangesMsg')}
      onConfirm={discardChanges}
      cancelText={t('Common.No')}
      confirmText={t('Common.Yes')}
    />
  );

  return {
    onLeavePage,
    hasUnsavedChanges,
    setUnsavedChanges,
    modalComponent,
  };
}
