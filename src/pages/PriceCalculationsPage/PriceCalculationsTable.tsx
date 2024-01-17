import { useTranslation } from 'react-i18next';
import { useProductionsFilter } from '../../app/api/Productions';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import TablePaginationContainer from '../../components/Table/TablePagination/TablePaginationContainer';
import Alert from '../../components/Feedback/Alert';
import { ProductDevelopmentDeepDto } from '../../app/generate';

type Props = {
  data: ProductDevelopmentDeepDto[];
};
function PriceCalculationsTable() {
  const { t } = useTranslation();

  return <></>;
}

export default PriceCalculationsTable;
