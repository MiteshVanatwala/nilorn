import { useCallback, useEffect, useState } from 'react';
import { useModal } from './useModal';
import { LocationsProps } from '../types/types';
import { unstable_useBlocker as useBlocker } from 'react-router';

export const NAV_LINK = 'nav-link';

const useModalNavigationBlocker = (preventClose: boolean = false) => {
  const { isOpen, close } = useModal();
  const [isBlocked, setBlocked] = useState<boolean>(false);
  const [isInline, setInline] = useState<boolean>(false);

  const handleBlockerCallback = useCallback(
    () =>
      ({ currentLocation, nextLocation }: LocationsProps) => {
        if (nextLocation.state === NAV_LINK) {
          setInline(true);
          return isOpen;
        }
        return currentLocation.pathname !== nextLocation.pathname && isOpen;
      },
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

  const proceedBlocker = () => {
    if (typeof (blocker as any).proceed === 'function' && isInline) {
      (blocker as any).proceed();
      setInline(false);
    }
  };

  return { isBlocked, setBlocked, proceedBlocker };
};

export default useModalNavigationBlocker;
