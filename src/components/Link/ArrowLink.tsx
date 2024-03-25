import { Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import { MouseEvent } from 'react';

type Props = {
  direction: 'left' | 'right';
  children: JSX.Element;
  showUnsavedChanges?: boolean;
  to: string;
};
const ArrowLink = ({
  direction,
  children,
  showUnsavedChanges = true,
  to,
}: Props) => {
  const navigate = useNavigate();
  const { onLeavePage, modalComponent } = useUnsavedChanges();

  const onClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (showUnsavedChanges) {
      e.preventDefault();
      onLeavePage(to);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <Button
        as={NavLink}
        end
        onClick={e => onClick(e)}
        to={to}
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
      {modalComponent}
    </>
  );
};

export default ArrowLink;
