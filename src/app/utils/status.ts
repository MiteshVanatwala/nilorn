import { Status } from '../generate';

export function getNextstatus(currentValue: Status): Status | null {
  const currentIndex = Object.values(Status).indexOf(currentValue);
  if (currentIndex !== -1 && currentIndex < Object.values(Status).length - 1) {
    return Object.values(Status)[currentIndex + 1] as Status;
  }
  return null;
}
