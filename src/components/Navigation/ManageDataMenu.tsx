import { useTranslation } from 'react-i18next';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import HeaderMenu from './HeaderMenu';
import { useNavigate } from 'react-router';

const ManageDataMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HeaderMenu title={t('Menu.HypManageData')}>
      <HeaderMenuButton onClick={() => navigate('/projects')}>
        <>{t('Menu.HypProjects')}</>
      </HeaderMenuButton>
      {/* <HeaderMenuButton onClick={() => navigate('/clients')}>
        <>{t('Menu.HypClients')}</>
      </HeaderMenuButton> */}
    </HeaderMenu>
  );
};

export default ManageDataMenu;
