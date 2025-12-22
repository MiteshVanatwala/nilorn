import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { BORDER_RADIUS, COLORS, SIZES } from '../../theme/Constants';
import text from '../../theme/text';
import RemixIcon from '../Icon/RemixIcon';

interface Props {
  title: string;
  children:
    | ((props: { onClose: () => void }) => JSX.Element)
    | JSX.Element
    | JSX.Element[];
}

const HeaderMenu = ({ title, children }: Props) => {
  return (
    <Menu gutter={6} variant={'headerMenu'}>
      {({ onClose }) => (
        <>
          <MenuButton
            as={Button}
            variant="menuButton"
            color={COLORS.BLACK}
            _hover={{ bgColor: COLORS.GRAY[10] }}
            fontWeight={text.variants.bodyRegular}
            rightIcon={
              <RemixIcon
                component="i"
                style={{ fontSize: SIZES.ICON.MD }}
                icon="ARROW_DOWN_S_FILL"
              />
            }>
            {title}
          </MenuButton>
          <MenuList
            bg={COLORS.GRAY[5]}
            borderRadius={`0 0  ${BORDER_RADIUS.MD} ${BORDER_RADIUS.MD}`}
            border="none"
            minW={'20rem'}>
            {typeof children === 'function' ? children({ onClose }) : children}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default HeaderMenu;
