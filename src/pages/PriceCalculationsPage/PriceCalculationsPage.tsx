import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import FormuQuerySubmit from '../../components/Form/FormQuerySubmit';
import ProductionsFilter from '../Productions/ProductionsFilter';
import ContentPage from '../Templates/ContentPage';
import PriceCalculationsTableContainer from './PriceCalculationsTableContainer';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import QueryKeysEnum from '../../app/api/queryKeys';

function PriceCalculationsPage() {
  const form = useForm();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
  }, [queryClient]);

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
