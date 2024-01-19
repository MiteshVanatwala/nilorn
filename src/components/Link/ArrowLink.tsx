import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

type Props = {
  direction: 'left' | 'right';
  to: string;
  children: JSX.Element;
  useAsBtn?: boolean;
  onClick?: () => void;
};
const ArrowLink = ({ to, direction, children, useAsBtn, onClick }: Props) => {
  return (
    <Button
      as={NavLink}
      to={useAsBtn ? undefined : to}
      end
      onClick={onClick ?? undefined}
      pr={0}
      variant={direction === 'left' ? 'backButton' : 'forwardButton'}
      leftIcon={
        direction === 'left' ? (
          <i className={`ri-arrow-left-line`} />
        ) : undefined
      }
      rightIcon={
        direction === 'left' ? undefined : (
          <i className={`ri-arrow-right-line`} />
        )
      }>
      {children}
    </Button>
  );
};

export default ArrowLink;
