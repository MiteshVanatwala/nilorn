import { Suspense, lazy, useEffect } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import { useForm } from 'react-hook-form';
import FormQuerySubmit from '../../components/Form/FormQuerySubmit';
import QueryKeysEnum from '../../app/api/queryKeys';
import { useQueryClient } from 'react-query';
import { useQueryParams } from '../../app/hooks/useQueryParams';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundaries';
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));
const ProductDevelopmentFilter = lazy(
  () => import('./ProductDevelopmentFilter')
);

function Overview() {
  const params = useQueryParams();
  const form = useForm({ defaultValues: params });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.Overview]);
  }, [queryClient]);

  return (
    <ErrorBoundary boundaryName="OverviewPage">
      <PaginationProvider>
        <LeavePageBlocker />
        <FormQuerySubmit form={form}>
          <Suspense>
            <ProductDevelopmentFilter />
          </Suspense>
          <Suspense>
            <OverviewTableContainer />
          </Suspense>
        </FormQuerySubmit>
      </PaginationProvider>
    </ErrorBoundary>
  );
}

export default Overview;
