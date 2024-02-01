import { Center, Heading } from '@chakra-ui/react';
import Spinner from './Spinner';
import { SPACE, COLORS, BORDER_RADIUS } from '../../theme/Constants';

type Props = {
  text?: string;
};
const SpinnerOverlay = ({ text }: Props) => {
  return (
    <Center
      bg={COLORS.GRAY[5] + '50'}
      zIndex={9}
      h="100vh"
      w="100vw"
      top={0}
      left={0}
      position={'fixed'}
      flexDirection={'column'}
      gap={SPACE.XL}
      borderRadius={BORDER_RADIUS.LG}>
      <Spinner size="xl" />
      {text && (
        <Heading as={'h2'} variant={'h4'} color={COLORS.GRAY[90]}>
          {text}
        </Heading>
      )}
    </Center>
  );
};

export default SpinnerOverlay;
