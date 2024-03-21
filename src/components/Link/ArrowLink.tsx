import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

type Props = {
  direction: 'left' | 'right';
  children: JSX.Element;
  useAsBtn?: boolean;
  onClick?: () => void;
};
const ArrowLink = ({ direction, children, useAsBtn, onClick }: Props) => {
  return (
    <Button
      as={NavLink}
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
