import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import ContentPage from '../Templates/ContentPage';

const PermissionDenied = () => {
  const { t } = useTranslation();

  return (
    <ContentPage title="" goBack={false}>
      <Flex grow={1} alignItems="center" justifyContent="center">
        <VStack spacing={SPACE.LG}>
          <Heading variant="h1" as="h1">
            <>{t('PermissionDenied.Title')}</>
          </Heading>
          <Box>
            <Text variant="bodyBigRegular">
              <>{t('PermissionDenied.Description')}</>
            </Text>
          </Box>
          <Button variant={'secondary'} as={NavLink} to="/">
            <>{t('PermissionDenied.GoToHome')}</>
          </Button>
        </VStack>
      </Flex>
    </ContentPage>
  );
};
export default PermissionDenied;
