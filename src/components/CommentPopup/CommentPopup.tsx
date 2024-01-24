import { Box, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Popup, { PopupTrigger } from '../Popup/Popup';
import { isNullOrWhiteSpace } from '../../app/utils/common';
import { SIZES, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  comment?: string | null | undefined;
};
const CommentPopup = ({ comment }: Props) => {
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false);

  if (!!comment) {
    const lines = comment
      .split('\n')
      .map((line, index) => (
        <Text key={index}>{isNullOrWhiteSpace(line) ? '\u00A0' : line}</Text>
      ));

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
                <Text
                  as={'i'}
                  fontSize={SIZES.ICON.MD}
                  className="ri-message-2-line"
                />
              }
            />
          }
          content={isDirty ? <Box>{lines}</Box> : <></>}
        />
      </>
    );
  }
  return <></>;
};

export default CommentPopup;
