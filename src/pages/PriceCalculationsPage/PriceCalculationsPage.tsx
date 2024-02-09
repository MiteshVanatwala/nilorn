import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import ProductionsFilter from '../Productions/ProductionsFilter';
import ContentPage from '../Templates/ContentPage';
import PriceCalculationsTableContainer from './PriceCalculationsTableContainer';

function PriceCalculationsPage() {
  const form = useForm();

  return (
    <ContentPage>
      <PaginationProvider>
        <FormuQuerySubmit form={form}>
          <ProductionsFilter /> {/** TODO Make own filter */}
          <PriceCalculationsTableContainer />
        </FormuQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default PriceCalculationsPage;
