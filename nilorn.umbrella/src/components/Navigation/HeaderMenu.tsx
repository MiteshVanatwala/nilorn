import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SIZES } from '../../theme/Constants';
import React from 'react';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const HeaderMenu = ({ title, children }: Props) => {
  return (
    <Menu gutter={0}>
      <MenuButton
        as={Button}
        variant="menuButton"
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
