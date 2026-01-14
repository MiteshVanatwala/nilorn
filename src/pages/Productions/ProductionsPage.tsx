import { useForm } from 'react-hook-form';
import { PaginationProvider } from '../../app/context/PaginationProvider';
import ContentPage from '../Templates/ContentPage';
import ProductionsFilter from './ProductionsFilter';
import ProductionsTableContainer from './ProductionsTableContainer';
import FormQuerySubmit from '../../components/Form/FormQuerySubmit';
import { useQueryParams } from '../../app/hooks/useQueryParams';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import PermissionDenied from '../PermissionDenied/PermissionDenied';

function ProductionsPage() {
  const params = useQueryParams();
  const form = useForm({ defaultValues: params });
  const showProduction = useAuthorizedSee('production');

  if (!showProduction) return <PermissionDenied />;

  return (
    <ContentPage>
      <PaginationProvider>
        <FormQuerySubmit form={form}>
          <ProductionsFilter />
          <ProductionsTableContainer />
        </FormQuerySubmit>
      </PaginationProvider>
    </ContentPage>
  );
}

export default ProductionsPage;
