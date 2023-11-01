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
};

type PaginationContextType = PaginationInfo & {
  totalPages: number;
  totalCount: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
};

const defaultState: PaginationContextType = {
  pageNumber: 1,
  pageSize: 30,
  totalPages: 0,
  totalCount: 0,
  setPageNumber: () => {},
  setPageSize: () => {},
  setTotalPages: () => {},
  setTotalCount: () => {},
};

const PaginationContext = createContext<PaginationContextType>(defaultState);

type PaginationProviderType = {
  children: ReactNode;
};

export const usePaginationContext = () =>
  useContext<PaginationContextType>(PaginationContext);

const PaginationProvider = ({ children }: PaginationProviderType) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  return (
    <PaginationContext.Provider
      value={{
        pageNumber,
        pageSize,
        totalPages,
        totalCount,
        setPageNumber,
        setPageSize,
        setTotalPages,
        setTotalCount,
      }}>
      {children}
    </PaginationContext.Provider>
  );
};

export { PaginationContext, PaginationProvider };
