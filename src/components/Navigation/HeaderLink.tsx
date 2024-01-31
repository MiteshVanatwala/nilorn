import { Link as LinkComponent } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../theme/Constants/colors';
import fontSizes from '../../theme/fontSizes';
import { FC } from 'react';

interface Props {
  title?: string | JSX.Element;
  path: string;
  clickedStoredFilter: string;
}

const HeaderLink: FC<Props> = ({ path, title, clickedStoredFilter }) => {
  const navigate = useNavigate();

  const handleClick = (url: string, clickedStoredFilter: string) => {
    let storedFilter = '';
    if (window.location.pathname === '/productions') {
      storedFilter = 'prevFilterProductions';
    } else if (window.location.pathname === '/') {
      storedFilter = 'prevFilterOverview';
    } else if (window.location.pathname === '/price-calculations') {
      storedFilter = 'prevFilterCalculation';
    }
    sessionStorage.setItem(storedFilter, window.location.search ?? '');
    const prevFilter =
      sessionStorage.getItem(clickedStoredFilter) ??
      '?pageSize=25&pageNumber=1';
    const newUrl = url + prevFilter;
    navigate(newUrl);
  };

  return (
    <LinkComponent
      _hover={{ bg: COLORS.GRAY[0], color: COLORS.BLUE[200] }}
      variant="headerLink"
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
