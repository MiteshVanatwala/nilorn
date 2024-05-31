import { Box, IconButton, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isNullOrWhiteSpace } from '../../app/utils/common';
import { SIZES, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import Popup, { PopupTrigger } from '../Popup/Popup';

type Props = {
  comment?: string | null | undefined;
  icon?: JSX.Element;
};
const CommentPopup = ({ comment, icon }: Props) => {
  const { t } = useTranslation();

  let lines = useMemo(() => {
    return !!comment?.length
      ? comment
          .split('\n')
          .map((line, index) => (
            <Text key={index}>
              {isNullOrWhiteSpace(line) ? '\u00A0' : line}
            </Text>
          ))
      : undefined;
  }, [comment]);

  if (!!lines) {
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
          content={<Box>{lines}</Box>}
        />
      </>
    );
  }

  return <></>;
};

export default CommentPopup;
