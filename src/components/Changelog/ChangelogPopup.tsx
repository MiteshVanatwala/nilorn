import { IconButton } from '@chakra-ui/react';
import { ChangelogItemDto } from '../../app/generate';
import { COLORS } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import Popup, { PopupPosition, PopupTrigger } from '../Popup/Popup';
import ChangelogPopupContent from './ChangelogPopupContent';

type Props = {
  data: ChangelogItemDto[];
};

const ChangelogPopup = ({ data }: Props) => {
  if (!data.length) {
    return <></>;
  }
  return (
    <Popup
      isPortal={false}
      trigger={PopupTrigger.CLICK}
      position={PopupPosition.ABOVE}
      size={'small'}
      triggerElement={
        <IconButton
          variant={'iconBtn'}
          aria-label="cangelog"
          bg={COLORS.YELLOW.LIGHT}
          color={COLORS.GRAY[90]}
          icon={
            <RemixIcon
              component="Text"
              color={COLORS.GRAY[90]}
              icon="HISTORY_LINE"
            />
          }
        />
      }
      content={<ChangelogPopupContent data={data} />}
    />
  );
};

export default ChangelogPopup;
