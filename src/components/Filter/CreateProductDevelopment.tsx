import { Box, Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const CreateProductDevelopment = () => {
  const { t } = useTranslation();
  return (
    <Box textAlign={'right'}>
      <Link href={'/product-development/create'}>
        <Button
          alignSelf={'end'}
          leftIcon={<i className="ri-add-line" />}
          variant={'primary'}>
          {t('Common.CreateNew')}
        </Button>
      </Link>
    </Box>
  );
};

export default CreateProductDevelopment;
