import { Suspense, lazy } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useForm } from 'react-hook-form';
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));

function Overview() {
  const form = useForm();
  return (
    <PaginationProvider>
      <FormuQuerySubmit form={form}>
        <Suspense>
          <ProductDevelopmentFilter />
        </Suspense>
      </FormuQuerySubmit>
      <Suspense>
        <OverviewTableContainer />
      </Suspense>
    </PaginationProvider>
  );
}

export default Overview;
