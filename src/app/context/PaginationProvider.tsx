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
  pageNumber: number;
  pageSize: number;
  sortState: SortingState;
};

type PaginationContextType = PaginationInfo & {
  totalPages: number;
  totalCount: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  setSortState: Dispatch<SetStateAction<SortingState>>;
};

const defaultState: PaginationContextType = {
  pageNumber: 1,
  pageSize: 25,
  totalPages: 0,
  totalCount: 0,
  sortState: [],
  setPageNumber: () => {},
  setPageSize: () => {},
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

const PaginationProvider = ({ children }: PaginationProviderType) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortState, setSortState] = useState<SortingState>([]);

  return (
    <PaginationContext.Provider
      value={{
        pageNumber,
        pageSize,
        totalPages,
        totalCount,
        sortState,
        setPageNumber,
        setPageSize,
        setTotalPages,
        setTotalCount,
        setSortState,
      }}>
      {children}
    </PaginationContext.Provider>
  );
};

export { PaginationContext, PaginationProvider };
