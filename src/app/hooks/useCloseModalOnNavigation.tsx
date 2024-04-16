import { useCallback, useEffect, useState } from 'react';
import { useModal } from './useModal';
import { LocationsProps } from '../types/types';
import { unstable_useBlocker as useBlocker } from 'react-router';

const useCloseModalOnNavigation = (preventClose: boolean = false) => {
  const { isOpen, close } = useModal();
  const [isBlocked, setBlocked] = useState<boolean>(false);

  const handleBlockerCallback = useCallback(
    () =>
      ({ currentLocation, nextLocation }: LocationsProps) =>
        currentLocation.pathname !== nextLocation.pathname && isOpen,
    [isOpen]
  );

  let blocker = useBlocker(handleBlockerCallback());

  useEffect(() => {
    if (blocker && blocker.state === 'blocked') {
      setBlocked(true);
      if (!preventClose) {
        close();
      }
    }
  }, [blocker, close, preventClose]);

  return isBlocked;
};

export default useCloseModalOnNavigation;
