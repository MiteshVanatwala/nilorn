import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import QueryKeysEnum from '../../app/api/queryKeys';

function ProductionsPage() {
  const form = useForm();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
  }, [queryClient]);

  return (
    <ContentPage>
      <PaginationProvider>
        <FormuQuerySubmit form={form}>
          <ProductionsFilter />
          <ProductionsTableContainer />
        </FormuQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default ProductionsPage;
