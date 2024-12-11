import { useEffect, useRef } from 'react';

export const useRefetchCompletion = (
  isFetching: boolean,
  isSuccess: boolean,
  onRefetchComplete: () => void
) => {
  const wasFetching = useRef(false);

  useEffect(() => {
    if (wasFetching.current && !isFetching && isSuccess) {
      onRefetchComplete();
    }
    wasFetching.current = isFetching;
  }, [isFetching, isSuccess, onRefetchComplete]);
};
