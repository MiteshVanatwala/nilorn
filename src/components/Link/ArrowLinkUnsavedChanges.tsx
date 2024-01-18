import { Button } from '@chakra-ui/react';
import UnsavedChangesModal from '../../pages/ProductDevelopmentPage/Sections/SectionComponents/UnsavedChangesModal';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';

type Props = {
  direction: 'left' | 'right';
  to: string;
  children: JSX.Element;
};
const ArrowLinkUnsavedChanges = ({ to, direction, children }: Props) => {
  const { handleModal } = useContext(ModalContext);

  return (
    <Button
      onClick={() => handleModal(<UnsavedChangesModal to={to} />)}
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

export default ArrowLinkUnsavedChanges;
