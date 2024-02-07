import { useFormContext } from 'react-hook-form';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export function useUnsavedChanges() {
  const { t } = useTranslation();
  const { handleModal, close } = useContext(ModalContext);
  const { reset, formState } = useFormContext();
  const navigate = useNavigate();

  function discardChanges(to: string) {
    navigate(to);
    reset();
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
    if (formState.isDirty) {
      return openModal(`${path}`);
    }

    return undefined;
  }

  return { onLeavePage };
}
