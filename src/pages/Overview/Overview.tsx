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
    <FormuQuerySubmit form={form}>
      <Suspense>
        <ProductDevelopmentFilter />
      </Suspense>
      <Suspense>
        <PaginationProvider>
          <OverviewTableContainer />
        </PaginationProvider>
      </Suspense>
    </FormuQuerySubmit>
  );
}

export default Overview;
