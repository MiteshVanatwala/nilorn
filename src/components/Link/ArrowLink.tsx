import { Button, ButtonProps } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleOnEnter } from '../../app/utils/keyboard';
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
      direction === 'left' ? (
        <RemixIcon component="i" icon="ARROW_LEFT_LINE" />
      ) : undefined,
    rightIcon:
      direction === 'left' ? undefined : (
        <RemixIcon component="i" icon="ARROW_RIGHT_LINE" />
      ),
  };
  const navigate = useNavigate();

  if (onClick && !to) {
    return (
      <Button onClick={onClick} {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Button
      as={NavLink}
      onKeyDown={e => handleOnEnter(e, () => to && navigate(to))}
      end
      to={to}
      {...props}>
      {children}
    </Button>
  );
};

export default ArrowLink;
