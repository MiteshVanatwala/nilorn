import { Text } from '@chakra-ui/react';
import { ProductionDto } from '../../../app/generate';

type Props = {
  data: ProductionDto[];
};

const ReleasedProductions = ({ data }: Props) => {
  return (
    <>
      {data.map((d, i) => (
        <Text w={'100%'}>
          {i}: {d.vendorName}, {d.released && 'RELEASED'}
        </Text>
      ))}
    </>
  );
};

export default ReleasedProductions;
