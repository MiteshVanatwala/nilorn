import { Button, ButtonProps } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import RemixIcon from '../Icon/RemixIcon';

type Props = {
  direction: 'left' | 'right';
  children: JSX.Element;
  to?: string;
  onClick?: () => void;
};

const ArrowLink = ({ direction, children, to, onClick }: Props) => {
  const props: ButtonProps = {
    pr: 0,
    variant: direction === 'left' ? 'backButton' : 'forwardButton',
    leftIcon:
      direction === 'left' ? <RemixIcon icon="ARROW_LEFT_LINE" /> : undefined,
    rightIcon:
      direction === 'left' ? undefined : <RemixIcon icon="ARROW_RIGHT_LINE" />,
  };
  if (onClick && !to) {
    return (
      <Button onClick={onClick} {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Button as={NavLink} end to={to} {...props}>
      {children}
    </Button>
  );
};

export default ArrowLink;
