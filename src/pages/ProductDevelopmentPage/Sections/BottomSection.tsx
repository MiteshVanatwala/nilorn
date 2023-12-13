import { Box, Grid, GridItem } from '@chakra-ui/layout';
import ContentSection from '../../Templates/ContentSection';
import { COLORS } from '../../../theme/Constants';

const BottomSection = () => {
  return (
    <Box
      position={'sticky'}
      bgColor={COLORS.WHITE}
      bottom={0}
      left={0}
      right={0}
      zIndex={99}
      borderTop={`solid 1px ${COLORS.GRAY[10]}`}>
      <ContentSection>
        <Grid>
          <GridItem>footer</GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default BottomSection;
