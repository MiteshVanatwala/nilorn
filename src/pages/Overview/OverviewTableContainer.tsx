import TablePagination from '../../components/Table/TablePagination/TablePagination';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useProductDevelopmentsFilter } from '../../app/api/Overview';
import { useEffect, useLayoutEffect } from 'react';
import OverviewTable from './OverviewTable';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/Feedback/Alert';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import {
  getSortState,
  useFilterSearchParams,
} from '../../components/Filter/FilterHelper';

const CHUNK_SIZES = [25, 75, 100, 300];

function OverviewTableContainer() {
  const { t } = useTranslation();
  const initSort = useFilterSearchParams('sortKey');
  const initPageNumber = useFilterSearchParams('pageNumber');
  const initPageSize = useFilterSearchParams('pageSize');

  const {
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
  } = usePaginationContext();

  const { data, isError, isLoading, isFetching } = useProductDevelopmentsFilter(
    pageNumber,
    pageSize
  );

  useLayoutEffect(() => {
    setTotalPages(data?.totalPages ?? 0);
    setTotalCount(data?.totalCount ?? 0);
    setPageNumber(
      initPageNumber ? Number(initPageNumber) : data?.pageNumber ?? 1
    );
    setPageSize(initPageSize ? Number(initPageSize) : CHUNK_SIZES[0]);
  }, [
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

  useEffect(() => {
    if (initSort) {
      setSortState(getSortState(initSort));
    }
  }, [setSortState, initSort]);

  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }

  return (
    <>
      {(isLoading || isFetching) && <SpinnerOverlay />}
      <OverviewTable
        data={data?.items ?? []}
        sortState={sortState}
        setSortState={setSortState}
      />
      <TablePagination
        pageNumber={pageNumber}
        totalNumPages={totalPages}
        totalCount={totalCount}
        currentPageSize={pageSize}
        chunkSizes={CHUNK_SIZES}
        nextHandler={() => setPageNumber(pageNumber + 1)}
        previousHandler={() => setPageNumber(pageNumber - 1)}
        pageNumberHandler={(num: number) => setPageNumber(num)}
        pageSizeHandler={(size: number) => setPageSize(size)}
      />
    </>
  );
}

export default OverviewTableContainer;
