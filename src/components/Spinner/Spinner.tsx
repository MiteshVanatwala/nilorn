import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import COLORS from '../../theme/Constants/colors';

type Props = {
  size?: 'md' | 'lg' | 'xl';
};
const Spinner = ({ size = 'lg' }: Props) => {
  return (
    <ChakraSpinner
      size={size}
      speed="0.65s"
      emptyColor={COLORS.BLUE[100]}
      color={COLORS.BLUE[200]}
    />
  );
};

export default Spinner;
