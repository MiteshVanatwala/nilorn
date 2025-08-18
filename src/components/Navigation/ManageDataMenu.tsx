import { useTranslation } from 'react-i18next';
import HeaderMenu from './HeaderMenu';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import HeaderLink from './HeaderLink';
import { SESSION_STORAGE } from '../../app/utils/constant';
import { VStack } from '@chakra-ui/react';

const ManageDataMenu = () => {
  const { t } = useTranslation();
  const showClientCard = useAuthorizedSee('client-card');
  const showProjectCard = useAuthorizedSee('project-card');

  return (
    <HeaderMenu title={t('Menu.HypManageData')}>
      {({ onClose }: { onClose: () => void }) => (
        <VStack alignItems="flex-start" spacing={0}>
          {showProjectCard === true ? (
            <HeaderLink
              variant="manageDataLink"
              title={t('Menu.HypProjects')}
              path="/projects/"
              clickedStoredFilter={SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO}
              onClick={onClose}
            />
          ) : null}
          {showClientCard === true ? (
            <HeaderLink
              variant="manageDataLink"
              title={t('Menu.HypClients')}
              path="/clients/"
              clickedStoredFilter={SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO}
              onClick={onClose}
            />
          ) : null}
        </VStack>
      )}
    </HeaderMenu>
  );
};

export default ManageDataMenu;
