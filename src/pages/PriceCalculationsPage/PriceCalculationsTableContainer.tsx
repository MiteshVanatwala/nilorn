import { useTranslation } from 'react-i18next';
import { useProductDevelopmentDeepFilter } from '../../app/api/productDevelopmentDeep';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import Alert from '../../components/Feedback/Alert';
import PriceCalculationsTable from './PriceCalculationsTable';

const CHUNK_SIZES = [25, 75, 100, 300];

function PriceCalculationsTableContainer() {
  const { t } = useTranslation();

  const { data, isError, isLoading, isFetching } =
    useProductDevelopmentDeepFilter(true, CHUNK_SIZES[0], false);

  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }
  return (
    <>
      {(isLoading || isFetching) && <SpinnerOverlay />}
      <PriceCalculationsTable data={data?.items ?? []} />
      <TablePaginationContainer data={data} chunkSizes={CHUNK_SIZES} />
    </>
  );
}

export default PriceCalculationsTableContainer;
