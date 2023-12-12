import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useProductDevelopmentsFilter } from '../../app/api/Overview';
import { useEffect } from 'react';
import OverviewTable from './OverviewTable';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/Feedback/Alert';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import {
  getSortState,
  useFilterSearchParams,
} from '../../components/Filter/FilterHelper';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';

const CHUNK_SIZES = [25, 75, 100, 300];
function OverviewTableContainer() {
  const { t } = useTranslation();
  const initSort = useFilterSearchParams('sortKey');
  const { sortState, setSortState } = usePaginationContext();

  const { data, isError, isLoading, isFetching } =
    useProductDevelopmentsFilter();

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
      <TablePaginationContainer data={data} chunkSizes={CHUNK_SIZES} />
    </>
  );
}

export default OverviewTableContainer;
