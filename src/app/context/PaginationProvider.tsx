import { SortingState } from '@tanstack/table-core';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type PaginationInfo = {
  sortState: SortingState;
};

type PaginationContextType = PaginationInfo & {
  totalPages: number;
  totalCount: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  setSortState: Dispatch<SetStateAction<SortingState>>;
};

const defaultState: PaginationContextType = {
  totalPages: 0,
  totalCount: 0,
  sortState: [],
  setTotalPages: () => {},
  setTotalCount: () => {},
  setSortState: () => {},
};

const PaginationContext = createContext<PaginationContextType>(defaultState);

type PaginationProviderType = {
  children: ReactNode;
};

export const usePaginationContext = () =>
  useContext<PaginationContextType>(PaginationContext);

/**
 * @deprecated use formstade instead. Still used for sortState, totalPages and totalCount.
 */
const PaginationProvider = ({ children }: PaginationProviderType) => {
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortState, setSortState] = useState<SortingState>([]);

  return (
    <PaginationContext.Provider
      value={{
        totalPages,
        totalCount,
        sortState,
        setTotalPages,
        setTotalCount,
        setSortState,
      }}>
      {children}
    </PaginationContext.Provider>
  );
};

export { PaginationContext, PaginationProvider };
