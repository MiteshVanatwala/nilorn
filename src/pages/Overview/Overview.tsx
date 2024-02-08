import { Suspense, lazy, useEffect } from 'react';
import {
  PaginationProvider,
  usePaginationContext,
} from '../../app/context/PaginationProvider';
import { useForm } from 'react-hook-form';
import { getSortValue } from '../../components/Filter/FilterHelper';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
const OverviewTableContainer = lazy(() => import('./OverviewTableContainer'));
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);

function Overview() {
  const form = useForm();

  const { sortState, pageSize, pageNumber } = usePaginationContext();

  useEffect(() => {
    if (sortState[0]?.id) {
      form.setValue('sortKey', getSortValue(sortState[0]));
    }
  }, [form, sortState]);

  return (
    <PaginationProvider>
      <FormuQuerySubmit pageSize={pageSize} pageNumber={pageNumber} form={form}>
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
