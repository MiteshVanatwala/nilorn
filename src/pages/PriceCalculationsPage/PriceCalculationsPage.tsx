import { PaginationProvider } from '../../app/context/PaginationProvider';
import ProductionsFilter from '../Productions/ProductionsFilter';
import ContentPage from '../Templates/ContentPage';
import PriceCalculationsTableContainer from './PriceCalculationsTableContainer';

function PriceCalculationsPage() {
  return (
    <ContentPage>
      <PaginationProvider>
        <ProductionsFilter /> {/** TODO Make own filter */}
        <PriceCalculationsTableContainer />
      </PaginationProvider>
    </ContentPage>
  );
}

export default PriceCalculationsPage;
