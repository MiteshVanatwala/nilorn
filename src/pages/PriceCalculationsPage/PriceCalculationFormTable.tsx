import { Box } from '@chakra-ui/react';
import { GridInlineTbody } from '../../components/GridTable/GridTableElements';
import { PriceDto } from '../../app/generate';
import { COLORS } from '../../theme/Constants';
import EditCalculationGridRow from './EditCalculationGridRow';
import EditCalculationGridHeader from './EditCalculationGridHeader';

type Props = {
  data: PriceDto[];
};

const PriceCalculationFormTable = ({ data }: Props) => {
  if (data.length === 0) {
    return <></>;
  }

  const GRID_LAYOUT_CALCULATION = 'repeat(5, 1fr)';

  return (
    <Box
      display={'inline-block'}
      overflowX={{ base: 'auto', lg: 'hidden' }}
      border={{ base: '1px solid' + COLORS.GRAY[20] }}>
      <GridInlineTbody
        gridTemplateColumns={{
          base: GRID_LAYOUT_CALCULATION,
          lg: GRID_LAYOUT_CALCULATION,
        }}>
        <EditCalculationGridHeader />
        <>
          {data?.map((c, index) => (
            <EditCalculationGridRow key={index} calculation={c} />
          ))}
        </>
      </GridInlineTbody>
    </Box>
  );
};

export default PriceCalculationFormTable;
