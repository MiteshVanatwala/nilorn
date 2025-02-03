import { Link as LinkComponent, MenuItem } from '@chakra-ui/react';

interface ButtonProps {
  children: JSX.Element;
  onClick: () => void;
}

const HeaderMenuButton = ({ children, onClick: onClickFunc }: ButtonProps) => {
  return (
    <MenuItem as={'div'} p={'0'} onClick={onClickFunc}>
      <LinkComponent variant="headerMenuButton">{children}</LinkComponent>
    </MenuItem>
  );
};

export { HeaderMenuButton };
