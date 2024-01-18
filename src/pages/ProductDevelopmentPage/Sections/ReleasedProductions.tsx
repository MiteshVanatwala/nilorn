import { Box } from '@chakra-ui/react';
import { ProductionDto } from '../../../app/generate';
import ProductionGridHeader from '../../../components/ProductionGrid/ProductionGridHeader';
import ProductionGridRow from '../../../components/ProductionGrid/ProductionGridRow';
import { GridInlineTbody } from '../../../components/GridTable/GridTableElements';
import { GRID_LAYOUT_PRODUCTION } from '../../Productions/ProductionsTable';

type Props = {
  data: ProductionDto[];
};

const ReleasedProductions = ({ data }: Props) => {
  if (data.length === 0) {
    return <></>;
  }

  return (
    <Box w={'100%'}>
      <GridInlineTbody gridTemplateColumns={GRID_LAYOUT_PRODUCTION}>
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
