import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useProductDevelopmentsFilter } from '../../app/api/Overview';
import { useEffect } from 'react';
import OverviewTable from './OverviewTable';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/Feedback/Alert';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { getSortState } from '../../app/utils/FilterHelper';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import { useFormContext } from 'react-hook-form';

const CHUNK_SIZES = [25, 75, 100, 300];
function OverviewTableContainer() {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const initSort = getValues('sortKey');
  const { sortState, setSortState } = usePaginationContext();

  const { data, isError, isLoading } = useProductDevelopmentsFilter(
    CHUNK_SIZES[0]
  );

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
      {isLoading && <SpinnerOverlay />}
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
