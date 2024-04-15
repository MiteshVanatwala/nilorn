import { useCallback, useEffect } from 'react';
import { useModal } from './useModal';
import { LocationsProps } from '../types/types';
import { unstable_useBlocker as useBlocker } from 'react-router';

const useCloseModalOnNavigation = () => {
  const { isOpen, close } = useModal();

  const handleBlockerCallback = useCallback(
    () =>
      ({ currentLocation, nextLocation }: LocationsProps) =>
        currentLocation.pathname !== nextLocation.pathname && isOpen,
    [isOpen]
  );

  let blocker = useBlocker(handleBlockerCallback());

  useEffect(() => {
    if (blocker && blocker.state === 'blocked') {
      close();
    }
  }, [blocker, close]);
};

export default useCloseModalOnNavigation;
