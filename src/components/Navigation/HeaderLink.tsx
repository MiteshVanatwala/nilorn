import { Link as LinkComponent } from '@chakra-ui/react';
import COLORS from '../../theme/Constants/colors';
import fontSizes from '../../theme/fontSizes';
import { FC } from 'react';
import { getCurrentStoredFilter } from '../Filter/FilterHelper';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';

interface Props {
  title?: string | JSX.Element;
  path: string;
  clickedStoredFilter: string;
  variant?: 'headerLink' | 'logo';
}

const HeaderLink: FC<Props> = ({
  path,
  title,
  clickedStoredFilter,
  variant = 'headerLink',
}) => {
  const { onLeavePage } = useUnsavedChanges();

  const handleClick = (url: string, clickedStoredFilter: string) => {
    const storedFilter = getCurrentStoredFilter();

    sessionStorage.setItem(storedFilter, window.location.search ?? '');
    const prevFilter =
      sessionStorage.getItem(clickedStoredFilter) ??
      '?pageSize=25&pageNumber=1';

    const newUrl = url + prevFilter;
    onLeavePage(newUrl);
  };

  return (
    <LinkComponent
      _hover={{ bg: COLORS.GRAY[0], color: COLORS.BLUE[200] }}
      variant={variant}
      bg={window.location.pathname === path ? COLORS.GRAY[0] : ''}
      color={window.location.pathname === path ? COLORS.BLUE[200] : ''}
      fontSize={fontSizes.xs}
      onClick={e => handleClick(path, clickedStoredFilter)}
      whiteSpace={'nowrap'}>
      {title}
    </LinkComponent>
  );
};

export default HeaderLink;
