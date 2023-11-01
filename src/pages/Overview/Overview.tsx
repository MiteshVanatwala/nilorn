import OverviewTableContainer from './OverviewTableContainer';
import { PaginationProvider } from '../../app/context/PaginationProvider';

function Overview() {
  return (
    <PaginationProvider>
      <OverviewTableContainer />
    </PaginationProvider>
  );
}

export default Overview;
