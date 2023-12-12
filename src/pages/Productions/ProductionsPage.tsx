import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';

function ProductionsPage() {
  return (
    <ContentPage>
      <ProductionsFilter />
      <ProductionsTableContainer />
    </ContentPage>
  );
}

export default ProductionsPage;
