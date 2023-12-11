import { Box, Container } from '@chakra-ui/layout';
import { SIZES } from '../../theme/Constants';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ContentSection = ({ children }: Props) => {
  return (
    <Container
      px={'0'}
      centerContent
      width={'100%'}
      maxW={'100%'}
      overflowX={'clip'}>
      <Box maxW={SIZES.CONTAINER.XL} w={'100%'} position={'relative'}>
        {children}
      </Box>
    </Container>
  );
};

export default ContentSection;
