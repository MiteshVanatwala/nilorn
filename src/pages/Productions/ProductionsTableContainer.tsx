import { ProductDevelopmentBriefDto } from '../../app/generate';
import ProductionsTable from './ProductionsTable';
import { productions } from './mock';
import Alert from '../../components/Feedback/Alert';
import { useTranslation } from 'react-i18next';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { useProductionsFilter } from '../../app/api/Productions';
import { useEffect } from 'react';

export type ProductionQuery = {
  productDevelopment: ProductDevelopmentBriefDto;
  sourcing: {
    name: string;
    productions: {
      id: string;
      vendorName: string;
      comment: string;
      sl: number;
      bl: number;
      moq: number;
      tool: number;
      sample: number;
      cur: string;
      qtyPur: {
        qty: number;
        pur: number;
      }[];
    }[];
  }[];
};
const CHUNK_SIZES = [25, 75, 100, 300];
const ProductionsTableContainer = () => {
  const { t } = useTranslation();

  const { data, isError, isLoading, isFetching } = useProductionsFilter();
  useEffect(() => {
    console.log('d', data);
  }, [data]);
  if (isError) {
    return <Alert status="info" title={`${t('Common.Error')}`} />;
  }
  console.log('data', data, isFetching);

  return (
    <>
      {(isLoading || isFetching) && <SpinnerOverlay />}
      <ProductionsTable
        productions={data?.items ?? []}
        productionsTwo={productions}
      />
      <TablePaginationContainer data={data} chunkSizes={CHUNK_SIZES} />
    </>
  );
};

export default ProductionsTableContainer;
