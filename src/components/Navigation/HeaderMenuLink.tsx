import { MenuItem } from '@chakra-ui/react';

interface ButtonProps {
  children: JSX.Element;
  onClick: () => void;
}

const HeaderMenuButton = ({ children, onClick: onClickFunc }: ButtonProps) => {
  return (
    <MenuItem onClick={onClickFunc}>
      <>{children}</>
    </MenuItem>
  );
};

export { HeaderMenuButton };
