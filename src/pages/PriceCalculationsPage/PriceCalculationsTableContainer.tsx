import { useTranslation } from 'react-i18next';
import { useProductionsFilter } from '../../app/api/Productions';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import Alert from '../../components/Feedback/Alert';
import PriceCalculationsTable from './PriceCalculationsTable';

const CHUNK_SIZES = [25, 75, 100, 300];

function PriceCalculationsTableContainer() {
  const { t } = useTranslation();

  const { data, isError, isLoading } = useProductionsFilter(true);

  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }
  return (
    <>
      {isLoading && <SpinnerOverlay />}
      <PriceCalculationsTable data={data?.items ?? []} />
      <TablePaginationContainer data={data} chunkSizes={CHUNK_SIZES} />
    </>
  );
}

export default PriceCalculationsTableContainer;
