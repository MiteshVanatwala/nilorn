import { Link as LinkComponent } from '@chakra-ui/react';
import COLORS from '../../theme/Constants/colors';
import fontSizes from '../../theme/fontSizes';
import { FC } from 'react';
import { getCurrentStoredFilter } from '../../app/utils/FilterHelper';
import { useLocation, useNavigate } from 'react-router-dom';
import text from '../../theme/text';
import { useLastVisitedPD } from '../../app/hooks/useLastVisitedPD';

interface Props {
  title?: string | JSX.Element;
  path: string;
  clickedStoredFilter: string;
  variant?: 'headerLink' | 'logo' | 'manageDataLink';
  onClick?: () => void;
}

const HeaderLink: FC<Props> = ({
  path,
  title,
  clickedStoredFilter,
  variant = 'headerLink',
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLastVisitedPD } = useLastVisitedPD();

  const handleClick = (url: string, clickedStoredFilter: string) => {
    const storedFilter = getCurrentStoredFilter();
    setLastVisitedPD('');

    sessionStorage.setItem(storedFilter, window.location.search ?? '');
    const isClientOrProjectPage =
      url.includes('/clients') || url.includes('/projects');
    const prevFilter = sessionStorage.getItem(clickedStoredFilter);

    const newUrl = isClientOrProjectPage
      ? url + (prevFilter ?? '')
      : url + (prevFilter ?? '?pageSize=25&pageNumber=1');

    if (location.pathname !== url) {
      navigate(newUrl);
    }
  };

  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const cleanPathname = location.pathname.replace(/^\/+|\/+$/g, '');
  const isActive =
    cleanPath !== ''
      ? cleanPathname.includes(cleanPath)
      : cleanPathname === cleanPath;

  return (
    <>
      <LinkComponent
        _hover={{ bg: variant !== 'logo' ? COLORS.GRAY[10] : COLORS.GRAY[0] }}
        variant={variant}
        as={'button'}
        color={isActive ? COLORS.BLUE[200] : ''}
        fontSize={fontSizes.xs}
        fontWeight={text.variants.bodyRegular.fontWeight}
        onClick={e => {
          handleClick(path, clickedStoredFilter);
          onClick?.();
        }}
        whiteSpace={'nowrap'}>
        {title}
      </LinkComponent>
    </>
  );
};

export default HeaderLink;
