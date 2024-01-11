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
        <OverviewTableContainer />
      </Suspense>
    </PaginationProvider>
  );
}

export default Overview;
