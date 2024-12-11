import ProductionsTable from './ProductionsTable';
import Alert from '../../components/Feedback/Alert';
import { useTranslation } from 'react-i18next';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { useProductDevelopmentDeepFilter } from '../../app/api/productDevelopmentDeep';
import { useLastVisitedPD } from '../../app/hooks/useLastVisitedPD';
import { useRefetchCompletion } from '../../app/hooks/useRefetchCompletion';

const CHUNK_SIZES = [25, 75, 100, 300];
const ProductionsTableContainer = () => {
  const { t } = useTranslation();

  const { data, isError, isLoading, isFetching, isSuccess } =
    useProductDevelopmentDeepFilter(false, CHUNK_SIZES[0]);

  const { setLastVisitedPD } = useLastVisitedPD();

  useRefetchCompletion(isFetching, isSuccess, () => {
    setLastVisitedPD('');
  });

  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }

  return (
    <>
      {(isLoading || isFetching) && <SpinnerOverlay />}
      <ProductionsTable productions={data?.items ?? []} />
      <TablePaginationContainer data={data} chunkSizes={CHUNK_SIZES} />
    </>
  );
};

export default ProductionsTableContainer;
