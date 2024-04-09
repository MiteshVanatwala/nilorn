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

  return {
    hasUnsavedChanges,
    setUnsavedChanges,
    discardChanges,
  };
}
