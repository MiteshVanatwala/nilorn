import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type PaginationInfo = {
  currentPage: number;
  maxRecordsPerPage: number;
};

type PaginationContextType = PaginationInfo & {
  totalPages: number;
  totalRecords: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setMaxRecordsPerPage: Dispatch<SetStateAction<number>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalRecords: Dispatch<SetStateAction<number>>;
};

const defaultState = {
  currentPage: 1,
  maxRecordsPerPage: 30,
  totalPages: 0,
  totalRecords: 0,
  setCurrentPage: () => {},
  setMaxRecordsPerPage: () => {},
  setTotalPages: () => {},
  setTotalRecords: () => {},
  setSortState: () => {},
};

const PaginationContext = createContext<PaginationContextType>(defaultState);

type PaginationProviderType = {
  children: ReactNode;
};

export const usePaginationContext = () =>
  useContext<PaginationContextType>(PaginationContext);

const PaginationProvider = ({ children }: PaginationProviderType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxRecordsPerPage, setMaxRecordsPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        maxRecordsPerPage,
        totalPages,
        totalRecords,
        setCurrentPage,
        setMaxRecordsPerPage,
        setTotalPages,
        setTotalRecords,
      }}>
      {children}
    </PaginationContext.Provider>
  );
};

export { PaginationContext, PaginationProvider };
