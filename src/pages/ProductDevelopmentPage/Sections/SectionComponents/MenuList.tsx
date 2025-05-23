import { Box } from '@chakra-ui/react';
import { MenuListProps } from 'chakra-react-select';
import { SelectOption } from '../../../../app/types/types';
import { COLORS } from '../../../../theme/Constants';

const MenuList = ({
  children,
}: MenuListProps<SelectOption, boolean, any> & {}) => {
  return <Box bg={COLORS.GRAY[10]}>{children}</Box>;
};
export default MenuList;
