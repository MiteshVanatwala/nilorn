import { Link as LinkComponent, MenuItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import COLORS from '../../theme/Constants/colors';

interface LinkProps {
  title: string;
  path: string;
}

const HeaderMenuLink = ({ title, path }: LinkProps) => {
  return (
    <MenuItem as={'div'} p={'0'} _focus={{ backgroundColor: COLORS.GRAY[5] }}>
      <LinkComponent as={NavLink} to={path} variant="headerMenulink">
        {title}
      </LinkComponent>
    </MenuItem>
  );
};

interface ButtonProps {
  children: JSX.Element;
  onClick: () => void;
}

const HeaderMenuButton = ({ children, onClick: onClickFunc }: ButtonProps) => {
  return (
    <LinkComponent onClick={onClickFunc} as={'button'} variant="headerLink">
      {children}
    </LinkComponent>
  );
};

export { HeaderMenuLink, HeaderMenuButton };
