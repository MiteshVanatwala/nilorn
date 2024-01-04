import { IconButton, Text } from '@chakra-ui/react';
import Popup, { PopupPosition, PopupTrigger } from '../Popup/Popup';
import { COLORS } from '../../theme/Constants';
import ChangelogPopupContent from './ChangelogPopupContent';
import { ChangelogDto } from '../../app/generate';

type Props = {
  data: ChangelogDto[];
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
            <Text
              as={'i'}
              color={COLORS.GRAY[90]}
              className={'ri-history-line'}
            />
          }
        />
      }
      content={<ChangelogPopupContent data={data} />}
    />
  );
};

export default ChangelogPopup;
