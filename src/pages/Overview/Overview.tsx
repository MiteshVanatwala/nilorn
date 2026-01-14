import { Suspense, lazy } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import { useForm } from 'react-hook-form';
import FormQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useQueryParams } from '../../app/hooks/useQueryParams';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));
const ProductDevelopmentFilter = lazy(
  () => import('./ProductDevelopmentFilter')
);

function Overview() {
  const params = useQueryParams();
  const form = useForm({ defaultValues: params });

  return (
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
  );
}

export default Overview;
