import TablePagination from '../../components/Table/TablePagination/TablePagination';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useProductDevelopmentsFilter } from '../../app/api/Overview';
import { useEffect, useLayoutEffect } from 'react';
import OverviewTable from './OverviewTable';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/Feedback/Alert';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { SORT } from '../../components/Form/FormQuerySubmit';
import { getSortValue } from '../../components/Filter/FilterHelper';
import { useFormContext } from 'react-hook-form';

const CHUNK_SIZES = [25, 75, 100, 300];

function OverviewTableContainer() {
  const { t } = useTranslation();

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

  const { data, isError, isSuccess, isLoading, isFetching } =
    useProductDevelopmentsFilter(pageNumber, pageSize);

  useLayoutEffect(() => {
    setTotalPages(data?.totalPages ?? 0);
    setTotalCount(data?.totalCount ?? 0);
    setPageNumber(data?.pageNumber ?? 1);
  }, [
    data?.pageNumber,
    data?.totalCount,
    data?.totalPages,
    setPageNumber,
    setTotalCount,
    setTotalPages,
  ]);

  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }

  return (
    <>
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
    </>
  );
}

export default OverviewTableContainer;
