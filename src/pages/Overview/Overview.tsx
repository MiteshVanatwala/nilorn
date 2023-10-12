import { Box } from '@chakra-ui/react';
import OverviewTableContainer from './OverviewTableContainer';
import { generateMockData } from './mock';
import { SPACE } from '../../theme/Constants';
import { PaginationProvider } from '../../app/context/PaginationProvider';

function Overview() {
  const data = generateMockData(50);

  return (
    <Box mt={SPACE.XL}>
      <PaginationProvider>
        <OverviewTableContainer data={data} />
      </PaginationProvider>
    </Box>
  );
}

export default Overview;
