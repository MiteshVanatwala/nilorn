import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import FormQuerySubmit from '../../components/Form/FormQuerySubmit';
import ContentPage from '../Templates/ContentPage';
import PriceCalculationsTableContainer from './PriceCalculationsTableContainer';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import QueryKeysEnum from '../../app/api/queryKeys';
import PriceCalculationsFilter from './PriceCalculationsFilter';
import { useQueryParams } from '../../app/hooks/useQueryParams';

function PriceCalculationsPage() {
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
          <PriceCalculationsFilter />
          <PriceCalculationsTableContainer />
        </FormQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default PriceCalculationsPage;
