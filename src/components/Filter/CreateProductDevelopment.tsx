import { Box, Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../../app/api/User';
import { ROLES_ALLOWED_TO_CREATE } from '../../app/Permissions/Permissions';
import { NavLink } from 'react-router-dom';

const CreateProductDevelopment = () => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();

  if (user?.role && ROLES_ALLOWED_TO_CREATE.includes(user.role)) {
    return (
      <Box textAlign={'right'}>
        <Link as={NavLink} to={'/product-development/create'}>
          <Button
            alignSelf={'end'}
            leftIcon={<i className="ri-add-line" />}
            variant={'primary'}>
            {t('Common.CreateNew')}
          </Button>
        </Link>
      </Box>
    );
  }
  return <></>;
};

export default CreateProductDevelopment;
