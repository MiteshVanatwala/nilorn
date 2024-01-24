import { Box } from '@chakra-ui/react';
import { ProductionDto } from '../../../app/generate';
import ProductionGridHeader from '../../../components/ProductionGrid/ProductionGridHeader';
import ProductionGridRow from '../../../components/ProductionGrid/ProductionGridRow';
import { GridInlineTbody } from '../../../components/GridTable/GridTableElements';
import {
  GRID_LAYOUT_PRODUCTION,
  GRID_LAYOUT_PRODUCTION_DESKTOP,
} from '../../Productions/ProductionsTable';

type Props = {
  data: ProductionDto[];
};

const ReleasedProductions = ({ data }: Props) => {
  if (data.length === 0) {
    return <></>;
  }

  return (
    <Box w={'100%'} overflowX={'scroll'}>
      <GridInlineTbody
        gridTemplateColumns={{
          base: GRID_LAYOUT_PRODUCTION,
          lg: GRID_LAYOUT_PRODUCTION_DESKTOP,
        }}>
        <ProductionGridHeader />
        <>
          {data.map(p => (
            <ProductionGridRow key={p.id} production={p} />
          ))}
        </>
      </GridInlineTbody>
    </Box>
  );
};

export default ReleasedProductions;
