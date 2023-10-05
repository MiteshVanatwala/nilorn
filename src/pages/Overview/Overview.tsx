import { Box } from '@chakra-ui/react';
import OverviewTableContainer from './OverviewTableContainer';
import { generateMockData } from './mock';
import { SPACE } from '../../theme/Constants';

function Overview() {
  const data = generateMockData(25);

  return (
    <Box mt={SPACE.XL}>
      <OverviewTableContainer data={data} />;
    </Box>
  );
}

export default Overview;
