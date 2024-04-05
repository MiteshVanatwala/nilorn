import { Center, Heading } from '@chakra-ui/react';
import Spinner from './Spinner';
import { SPACE, COLORS, BORDER_RADIUS } from '../../theme/Constants';

type Props = {
  text?: string;
  fillContainer?: boolean;
};
const SpinnerOverlay = ({ text, fillContainer = false }: Props) => {
  return (
    <Center
      bg={COLORS.GRAY[5] + (fillContainer ? '90' : '50')}
      zIndex={9}
      h={fillContainer ? '100%' : '100vh'}
      w={fillContainer ? '100%' : '100vw'}
      top={0}
      left={0}
      position={fillContainer ? 'absolute' : 'fixed'}
      flexDirection={'column'}
      gap={SPACE.XL}
      borderRadius={fillContainer ? undefined : BORDER_RADIUS.LG}>
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
