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
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundaries';

function PriceCalculationsPage() {
  const params = useQueryParams();
  const form = useForm({ defaultValues: params });
  const showCalculation = useAuthorizedSee('price-calculation');
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
  }, [queryClient]);

  if (!showCalculation) return <PermissionDenied />;

  return (
    <ErrorBoundary boundaryName="PriceCalculationsPage">
      <ContentPage>
        <PaginationProvider>
          <FormQuerySubmit form={form}>
            <PriceCalculationsFilter />
            <PriceCalculationsTableContainer />
          </FormQuerySubmit>
        </PaginationProvider>
      </ContentPage>
    </ErrorBoundary>
  );
}

export default PriceCalculationsPage;
