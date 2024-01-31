import { useLayoutEffect } from 'react';
import { usePaginationContext } from '../../../app/context/PaginationProvider';
import { useFilterSearchParams } from '../../Filter/FilterHelper';
import TablePagination from './TablePagination';

type TableList = {
  pageNumber?: number;
  readonly totalPages?: number;
  readonly totalCount?: number;
};

type Props = {
  chunkSizes: number[];
  data?: TableList;
};

const TablePaginationContainer = ({ data, chunkSizes }: Props) => {
  const initPageNumber = useFilterSearchParams('pageNumber') ?? 0;
  const initPageSize = useFilterSearchParams('pageSize') ?? 0;

  const {
    pageNumber,
    pageSize,
    totalPages,
    totalCount,
    setPageNumber,
    setPageSize,
    setTotalPages,
    setTotalCount,
  } = usePaginationContext();

  useLayoutEffect(() => {
    setTotalPages(data?.totalPages ?? 0);
    setTotalCount(data?.totalCount ?? 0);
    setPageNumber(
      initPageNumber ? Number(initPageNumber) : data?.pageNumber ?? 1
    );
    setPageSize(initPageSize ? Number(initPageSize) : chunkSizes[0]);
  }, [
    chunkSizes,
    data?.pageNumber,
    data?.totalCount,
    data?.totalPages,
    initPageNumber,
    initPageSize,
    setPageNumber,
    setPageSize,
    setTotalCount,
    setTotalPages,
  ]);

  return (
    <TablePagination
      pageNumber={pageNumber}
      totalNumPages={totalPages}
      totalCount={totalCount}
      currentPageSize={pageSize}
      chunkSizes={chunkSizes}
      nextHandler={() => setPageNumber(pageNumber + 1)}
      previousHandler={() => setPageNumber(pageNumber - 1)}
      pageNumberHandler={(num: number) => setPageNumber(num)}
      pageSizeHandler={(size: number) => setPageSize(size)}
    />
  );
};

export default TablePaginationContainer;
