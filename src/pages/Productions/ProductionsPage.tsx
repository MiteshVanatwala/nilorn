import { PaginationProvider } from '../../app/context/PaginationProvider';
import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';

function ProductionsPage() {
  return (
    <ContentPage>
      <PaginationProvider>
        <ProductionsFilter />
        <ProductionsTableContainer />
      </PaginationProvider>
    </ContentPage>
  );
}

export default ProductionsPage;
