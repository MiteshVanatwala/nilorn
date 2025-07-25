import { useTranslation } from 'react-i18next';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import HeaderMenu from './HeaderMenu';
import { useNavigate } from 'react-router';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';

const ManageDataMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showClientCard = useAuthorizedSee('client-card');
  const showProjectCard = useAuthorizedSee('project-card');

  return (
    <HeaderMenu title={t('Menu.HypManageData')}>
      {showProjectCard === true ? (
        <HeaderMenuButton
          onClick={() => {            
            navigate('/projects/');
          }}>
          <>{t('Menu.HypProjects')}</>
        </HeaderMenuButton>
      ) : (
        <></>
      )}
      {showClientCard === true ? (
        <HeaderMenuButton onClick={() => navigate('/clients')}>
          <>{t('Menu.HypClients')}</>
        </HeaderMenuButton>
      ) : (
        <></>
      )}
    </HeaderMenu>
  );
};

export default ManageDataMenu;
