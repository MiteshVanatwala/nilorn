import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { COLORS, SPACE } from '../../theme/Constants';
import ArtworkButton from '../Button/ArtworkButton';
import { useTranslation } from 'react-i18next';

type Props = {
  artwork?: string | null | undefined;
  lastModifiedDate?: string | null | undefined;
  moreMenuList?: JSX.Element;
  actionButtons: JSX.Element;
};

const ActionBarTemplate = ({
  artwork,
  moreMenuList,
  actionButtons,
  lastModifiedDate,
}: Props) => {
  const { t } = useTranslation();
  const formattedLastModifiedDate = lastModifiedDate
    ? new Date(lastModifiedDate).toLocaleString()
    : undefined;

  return (
    <VStack align={'left'}>
      <HStack
        justifyContent={{
          base: 'start',
          md: 'end',
        }}
        flexWrap={{
          base: 'wrap',
          md: 'nowrap',
        }}
        gap={{
          base: SPACE.XXS,
          lg: SPACE.XS,
        }}>
        {artwork && <ArtworkButton url={artwork} />}

        {moreMenuList && (
          <Menu>
            <MenuButton
              as={IconButton}
              variant={'secondary'}
              padding={SPACE.SM}
              aria-label={t('Common.More')}
              icon={
                <Text color={COLORS.WHITE} as={'i'} className="ri-more-line" />
              }
            />
            {moreMenuList}
          </Menu>
        )}
        {actionButtons}
      </HStack>
      {formattedLastModifiedDate && (
        <Text
          align={{
            base: 'left',
            lg: 'right',
          }}>
          {t('Common.LastEdited')} {formattedLastModifiedDate}
        </Text>
      )}
    </VStack>
  );
};

export default ActionBarTemplate;
