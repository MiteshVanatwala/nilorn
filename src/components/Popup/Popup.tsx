import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';

export enum PopupPosition {
  ABOVE = 'above',
  BELOW = 'below',
}

export enum PopupTrigger {
  HOVER = 'hover',
  CLICK = 'click',
}

type Props = {
  trigger?: PopupTrigger;
  triggerElement?: JSX.Element;
  content?: JSX.Element;
  position?: PopupPosition;
  isPortal?: boolean;
  size?: 'small';
};

const Popup = ({
  trigger = PopupTrigger.HOVER,
  triggerElement,
  content,
  position = PopupPosition.BELOW,
  isPortal,
  size,
}: Props) => {
  const popupContent = (
    <PopoverContent
      maxW={SIZES.CONTAINER.XS}
      onClick={e => e.stopPropagation()}>
      <PopoverArrow />
      <PopoverBody>{content}</PopoverBody>
    </PopoverContent>
  );
  return (
    <Popover
      trigger={trigger}
      placement={position === PopupPosition.ABOVE ? 'top' : 'bottom'}
      closeOnBlur={true}
      size={size}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      {isPortal ? <Portal>{popupContent}</Portal> : popupContent}
    </Popover>
  );
};

export default Popup;
