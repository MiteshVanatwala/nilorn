import { Box, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isNullOrWhiteSpace } from '../../app/utils/common';
import { SIZES, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import Popup, { PopupTrigger } from '../Popup/Popup';

type Props = {
  comment?: string | null | undefined;
  icon?: JSX.Element;
  showIcon?: boolean;
};
const CommentPopup = ({ comment, icon, showIcon }: Props) => {
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false);

  let lines = !!comment?.length
    ? comment
        .split('\n')
        .map((line, index) => (
          <Text key={index}>{isNullOrWhiteSpace(line) ? '\u00A0' : line}</Text>
        ))
    : undefined;

  if (!!lines || showIcon) {
    return (
      <>
        <Popup
          isPortal={false}
          trigger={PopupTrigger.HOVER}
          triggerElement={
            <IconButton
              aria-label={t('Common.ReadComment')}
              variant={'ghost'}
              padding={SPACE.SM}
              onMouseEnter={() => setIsDirty(true)}
              icon={
                icon ?? (
                  <RemixIcon
                    component="Text"
                    icon="MESSAGE_2_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                )
              }
            />
          }
          content={isDirty ? <Box>{lines}</Box> : <></>}
          hideContent={!lines}
        />
      </>
    );
  }
  return <></>;
};

export default CommentPopup;
