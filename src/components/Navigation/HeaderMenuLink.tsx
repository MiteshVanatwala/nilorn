import { Link as LinkComponent, MenuItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  title: string;
  path: string;
}

const HeaderMenuLink = ({ title, path }: LinkProps) => {
  return (
    <MenuItem as={'div'} p={'0'}>
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
    <MenuItem as={'div'} p={'0'}>
      <LinkComponent
        onClick={onClickFunc}
        as={'button'}
        variant="headerMenuButton">
        {children}
      </LinkComponent>
    </MenuItem>
  );
};

export { HeaderMenuLink, HeaderMenuButton };
