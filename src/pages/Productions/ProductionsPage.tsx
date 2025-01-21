import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';
import FormQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import QueryKeysEnum from '../../app/api/queryKeys';
import { useQueryParams } from '../../app/hooks/useQueryParams';

function ProductionsPage() {
  const params = useQueryParams();
  const form = useForm({ defaultValues: params });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
  }, [queryClient]);

  return (
    <ContentPage>
      <PaginationProvider>
        <FormQuerySubmit form={form}>
          <ProductionsFilter />
          <ProductionsTableContainer />
        </FormQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default ProductionsPage;
