import { Box, Container } from '@chakra-ui/layout';
import { SIZES, SPACE } from '../../theme/Constants';

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
  goBack?: boolean;
}

const ContentPage = ({ children, title, goBack }: Props) => {
  return (
    <Container
      centerContent
      width={'100%'}
      maxW={'100%'}
      height={'100%'}
      mt={SPACE.LG}
      pb={SPACE.XXL}
      overflowX={{ base: 'unset', lg: 'clip' }}>
      <Box maxW={SIZES.CONTAINER.XL} w={'100%'} position={'relative'}>
        {children}
      </Box>
    </Container>
  );
};

export default ContentPage;
