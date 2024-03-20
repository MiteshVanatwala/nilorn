import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const IS_DIRTY = 'isDirty';

export function useUnsavedChanges() {
  const { t } = useTranslation();
  const { handleModal, close } = useContext(ModalContext);
  const navigate = useNavigate();

  function setUnsavedChanges(isDirty: boolean) {
    sessionStorage.setItem(IS_DIRTY, isDirty.toString());
  }

  function discardChanges(to: string) {
    navigate(to);
    setUnsavedChanges(false);
    close();
  }

  function openModal(path: string) {
    handleModal(
      <ConfirmModal
        title={t('PD.UnsavedChanges')}
        description={t('PD.UnsavedChangesMsg')}
        onConfirm={() => discardChanges(path)}
        cancelText={t('Common.No')}
        confirmText={t('Common.Yes')}
      />
    );
  }

  function onLeavePage(path: string) {
    if (sessionStorage.getItem(IS_DIRTY) === 'true') {
      return openModal(`${path}`);
    }
    setUnsavedChanges(false);
    return navigate(path);
  }

  function hasUnsavedChanges() {
    return sessionStorage.getItem(IS_DIRTY) === 'true';
  }

  return {
    onLeavePage,
    hasUnsavedChanges,
    setUnsavedChanges,
  };
}
