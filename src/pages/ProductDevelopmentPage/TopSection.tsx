import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { BOX_SHADOW, COLORS } from '../../theme/Constants';
import ContentSection from '../Templates/ContentSection';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable';
import ActionBar from './ActionBar';

type Props = {
  productNo: string;
  scrolledPast: boolean;
};
const TopSection = ({ productNo, scrolledPast }: Props) => {
  return (
    <Box
      position={'sticky'}
      top={0}
      zIndex={99}
      bgColor={COLORS.WHITE}
      boxShadow={scrolledPast ? BOX_SHADOW.CARD : 'none'}>
      <ContentSection>
        <Grid>
          <GridItem>
            <HStack>
              <Text>
                {'#'}
                {productNo}
              </Text>
              <Heading>
                <Editable defaultValue="ProductDevelopment">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Heading>
            </HStack>
            <ActionBar />
            {scrolledPast && 'sticky'}
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default TopSection;
