import { Suspense, lazy, useEffect } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import { useForm } from 'react-hook-form';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useQueryClient } from 'react-query';
import QueryKeysEnum from '../../app/api/queryKeys';
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);

function Overview() {
  const form = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.Overview]);
  }, [queryClient]);

  return (
    <PaginationProvider>
      <FormuQuerySubmit form={form}>
        <Suspense>
          <ProductDevelopmentFilter />
        </Suspense>
        <Suspense>
          <OverviewTableContainer />
        </Suspense>
      </FormuQuerySubmit>
    </PaginationProvider>
  );
}

export default Overview;
