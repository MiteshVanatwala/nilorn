import { Text } from '@chakra-ui/layout';
import ContentPage from '../Templates/ContentPage';
import OverviewTableContainer from './OverviewTableContainer';
import { Button } from '@chakra-ui/button';
import { generateMockData } from './mock';

function Overview() {
  const data = generateMockData(25);

  return (
    <ContentPage>
      <Text>[FILTER]</Text>
      <Button variant={'primary'}>test</Button>

      <OverviewTableContainer data={data} />
    </ContentPage>
  );
}

export default Overview;
