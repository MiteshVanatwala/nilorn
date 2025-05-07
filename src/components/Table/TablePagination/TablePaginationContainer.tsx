import { useLayoutEffect } from 'react';
import { usePaginationContext } from '../../../app/context/PaginationProvider';
import TablePagination from './TablePagination';
import { useFormContext } from 'react-hook-form';

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
  const { setValue, watch } = useFormContext();
  const pageNumber = Number(watch('pageNumber')) ?? data?.pageNumber ?? 1;
  const pageSize = Number(watch('pageSize')) ?? chunkSizes[0];

  const { totalPages, totalCount, setTotalPages, setTotalCount } =
    usePaginationContext();

  useLayoutEffect(() => {
    setTotalPages(data?.totalPages ?? 0);
    setTotalCount(data?.totalCount ?? 0);

  if ((data?.totalPages ?? 0) > 0 && pageNumber > (data?.totalPages ?? 0)) {
    setValue('pageNumber', 1);
  }

  }, [
    chunkSizes,
    data?.pageNumber,
    data?.totalCount,
    data?.totalPages,
    setTotalCount,
    setTotalPages,
    setValue,
  ]);

  return (
    <TablePagination
      pageNumber={!Number.isNaN(pageNumber) ? pageNumber : 1}
      totalNumPages={totalPages}
      totalCount={totalCount}
      currentPageSize={!Number.isNaN(pageSize) ? pageSize : chunkSizes[0]}
      chunkSizes={chunkSizes}
      nextHandler={() =>
        setValue('pageNumber', (!Number.isNaN(pageNumber) ? pageNumber : 1) + 1)
      }
      previousHandler={() =>
        setValue('pageNumber', (!Number.isNaN(pageNumber) ? pageNumber : 1) - 1)
      }
      pageNumberHandler={(num: number) => setValue('pageNumber', num)}
      pageSizeHandler={(size: number) => setValue('pageSize', size)}
    />
  );
};

export default TablePaginationContainer;
