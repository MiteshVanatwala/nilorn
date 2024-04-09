import { useModal } from './useModal';

const IS_DIRTY = 'isDirty';

export function useUnsavedChanges() {
  const { close } = useModal();

  function setUnsavedChanges(isDirty: boolean) {
    sessionStorage.setItem(IS_DIRTY, isDirty.toString());
  }

  function discardChanges() {
    close();
    setUnsavedChanges(false);
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
    hasUnsavedChanges,
    setUnsavedChanges,
    discardChanges,
  };
}
