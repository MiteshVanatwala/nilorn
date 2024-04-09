import { Suspense, lazy } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import { useForm } from 'react-hook-form';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);

function Overview() {
  const form = useForm();

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
