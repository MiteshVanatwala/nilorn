import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SIZES } from '../../theme/Constants';
import text from '../../theme/text';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const HeaderMenu = ({ title, children }: Props) => {
  return (
    <Menu gutter={6}>
      <MenuButton
        as={Button}
        variant="menuButton"
        color={COLORS.BLACK}
        _hover={{ bgColor: COLORS.GRAY[10] }}
        fontWeight={text.variants.bodyRegular}
        rightIcon={
          <i
            className="ri-arrow-down-s-fill"
            style={{ fontSize: SIZES.ICON.MD }}
          />
        }>
        {title}
      </MenuButton>
      <MenuList
        bg={COLORS.GRAY[5]}
        borderRadius={`0 0  ${BORDER_RADIUS.MD} ${BORDER_RADIUS.MD}`}
        border="none"
        minW={'20rem'}>
        {children}
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
