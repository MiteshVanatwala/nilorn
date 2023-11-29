import { Suspense, lazy } from 'react';
import { PaginationProvider } from '../../app/context/PaginationProvider';
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));

function Overview() {
  return (
    <PaginationProvider>
      <Suspense>
        <ProductDevelopmentFilter />
      </Suspense>
      <Suspense>
        <OverviewTableContainer />
      </Suspense>
    </PaginationProvider>
  );
}

export default Overview;
