import { Divider } from '@chakra-ui/react';
import COLORS from '../../theme/Constants/colors';

const HeaderDivider = () => {
  return (
    <Divider
      orientation="vertical"
      opacity={1}
      m={0}
      borderColor={COLORS.GRAY[40]}
      height="6.9rem"
    />
  );
};

export default HeaderDivider;
