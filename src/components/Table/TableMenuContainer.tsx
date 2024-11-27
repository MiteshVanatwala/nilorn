import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';

type Props = {
  children: ReactNode;
};

const TableMenuContainer = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        padding={SPACE.SM}
        aria-label={t('Common.More')}
        icon={<RemixIcon component="Text" icon="MORE_LINE" />}
      />
      <MenuList lineHeight={1.5} zIndex={3}>
        {children}
      </MenuList>
    </Menu>
  );
};

export default TableMenuContainer;
