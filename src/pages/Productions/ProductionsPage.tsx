import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';

function ProductionsPage() {
  const form = useForm();

  return (
    <ContentPage>
      <PaginationProvider>
        <FormuQuerySubmit form={form}>
          <ProductionsFilter />
          <ProductionsTableContainer />
        </FormuQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default ProductionsPage;
