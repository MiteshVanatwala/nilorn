import { Button, ButtonProps } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

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
      direction === 'left' ? <i className={`ri-arrow-left-line`} /> : undefined,
    rightIcon:
      direction === 'left' ? undefined : (
        <i className={`ri-arrow-right-line`} />
      ),
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
