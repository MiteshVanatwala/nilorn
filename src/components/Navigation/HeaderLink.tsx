import { Link as LinkComponent } from '@chakra-ui/react';
import COLORS from '../../theme/Constants/colors';
import fontSizes from '../../theme/fontSizes';
import { FC } from 'react';
import { getCurrentStoredFilter } from '../../app/utils/FilterHelper';
import { useNavigate } from 'react-router-dom';

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
  const pathname = window.location.pathname.replace(/\/$/, '');

  const navigate = useNavigate();
  const handleClick = (url: string, clickedStoredFilter: string) => {
    const storedFilter = getCurrentStoredFilter();

    sessionStorage.setItem(storedFilter, window.location.search ?? '');
    const prevFilter =
      sessionStorage.getItem(clickedStoredFilter) ??
      '?pageSize=25&pageNumber=1';

    const newUrl = url + prevFilter;
    navigate(newUrl);
  };

  return (
    <>
      <LinkComponent
        _hover={{ bg: COLORS.GRAY[0], color: COLORS.BLUE[200] }}
        variant={variant}
        bg={pathname === path ? COLORS.GRAY[0] : ''}
        color={pathname === path ? COLORS.BLUE[200] : ''}
        fontSize={fontSizes.xs}
        onClick={e => handleClick(path, clickedStoredFilter)}
        whiteSpace={'nowrap'}>
        {title}
      </LinkComponent>
    </>
  );
};

export default HeaderLink;
