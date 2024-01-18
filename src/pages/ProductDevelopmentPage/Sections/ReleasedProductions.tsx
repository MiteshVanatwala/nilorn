import { Box, Grid } from '@chakra-ui/react';
import { ProductionDto } from '../../../app/generate';
import ProductionGridHeader from '../../../components/ProductionGrid/ProductionGridHeader';
import ProductionGridRow, {
  PRODUCTIONS_NUM_OF_FR,
} from '../../../components/ProductionGrid/ProductionGridRow';

type Props = {
  data: ProductionDto[];
};

const ReleasedProductions = ({ data }: Props) => {
  if (data.length === 0) {
    return <></>;
  }

  return (
    <Box w={'100%'}>
      <Grid
        h={'4.6rem'}
        lineHeight={1.15}
        gridTemplateColumns={`repeat(${PRODUCTIONS_NUM_OF_FR}, 1fr)`}>
        <ProductionGridHeader />
      </Grid>
      <Grid
        gap={'1px'}
        gridTemplateColumns={`repeat(${PRODUCTIONS_NUM_OF_FR}, 1fr)`}
        alignItems={'stretch'}
        height={'100%'}>
        {data.map(p => (
          <ProductionGridRow key={p.id} production={p} />
        ))}
      </Grid>
    </Box>
  );
};

export default ReleasedProductions;
