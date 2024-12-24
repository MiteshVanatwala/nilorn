import { Box, Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROLES_ALLOWED_TO_CREATE } from '../../app/Permissions/Permissions';
import { useCurrentUser } from '../../app/api/User';
import RemixIcon from '../Icon/RemixIcon';

const CreateProductDevelopment = () => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();

  if (user?.role && ROLES_ALLOWED_TO_CREATE.includes(user.role)) {
    return (
      <Box textAlign={'right'}>
        <Button
          as={NavLink}
          to={'/product-development/create'}
          alignSelf={'end'}
          rightIcon={<RemixIcon component="i" icon="ADD_LINE" />}
          variant={'primary'}>
          {t('Common.CreateNew')}
        </Button>
      </Box>
    );
  }
  return <></>;
};

export default CreateProductDevelopment;
