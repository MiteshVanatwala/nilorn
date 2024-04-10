const IS_DIRTY = 'isDirty';

export function useUnsavedChanges() {
  function setUnsavedChanges(isDirty: boolean) {
    sessionStorage.setItem(IS_DIRTY, isDirty.toString());
  }

  function discardChanges() {
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
