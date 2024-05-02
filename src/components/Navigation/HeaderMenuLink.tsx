import { Link as LinkComponent, MenuItem } from '@chakra-ui/react';

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

export { HeaderMenuButton };
