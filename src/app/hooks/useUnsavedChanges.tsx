import { SESSION_STORAGE } from '../utils/constant';

export function useUnsavedChanges() {
  function setUnsavedChanges(isDirty: boolean) {
    sessionStorage.setItem(SESSION_STORAGE.IS_DIRTY, isDirty.toString());
  }

  function discardChanges() {
    setUnsavedChanges(false);
  }

  const hasUnsavedChanges = () => {
    return sessionStorage.getItem(SESSION_STORAGE.IS_DIRTY) === 'true';
  };

  return {
    hasUnsavedChanges,
    setUnsavedChanges,
    discardChanges,
  };
}
