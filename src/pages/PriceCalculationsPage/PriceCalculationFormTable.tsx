import { Box } from '@chakra-ui/react';
import { GridInlineTbody } from '../../components/GridTable/GridTableElements';
import { PriceDto } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import EditCalculationGridRow from './EditCalculationGridRow';
import EditCalculationGridHeader from './EditCalculationGridHeader';

type Props = {
  data: PriceDto[];
};

const PriceCalculationFormTable = ({ data }: Props) => {
  if (data.length === 0) {
    return <></>;
  }

  const GRID_LAYOUT_CALCULATION = 'repeat(3, minmax(0, 80px)) 90px 150px';

  return (
    <Box
      mt={{ base: SPACE.LG, lg: SPACE.XXL }}
      display={'inline-block'}
      overflowX={{ base: 'auto', lg: 'hidden' }}>
      <GridInlineTbody
        gap="0"
        gridTemplateColumns={{
          base: GRID_LAYOUT_CALCULATION,
          lg: GRID_LAYOUT_CALCULATION,
        }}>
        <EditCalculationGridHeader />
        <>
          {data?.map((c, index) => (
            <EditCalculationGridRow key={index} index={index} calculation={c} />
          ))}
        </>
      </GridInlineTbody>
    </Box>
  );
};

export default PriceCalculationFormTable;
