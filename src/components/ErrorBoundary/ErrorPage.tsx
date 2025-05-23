import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';

type Pros = {
  title?: string;
  messages?: string;
  button?: JSX.Element;
};

const ErrorPage = ({ title, messages, button }: Pros) => {
  const { t } = useTranslation();

  return (
    <Flex
      grow={1}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      // bgImg={images.request_error}
      bgRepeat="no-repeat"
      bgPos="bottom 1.5rem left 2rem"
      bgSize="auto">
      <VStack mb={250} spacing={SPACE.MD} background={COLORS.WHITE} p={4}>
        <Box>
          <Heading variant="h1" as="h1" color={COLORS.ERROR}>
            <>
              {title ? title : <>{t('Common.errorTitle')}</>}
              <RemixIcon
                component="Text"
                icon="ALERT_LINE"
                color="inherit"
                position="relative"
                top={2}
                left={2}
              />
            </>
          </Heading>
        </Box>
        <Box maxWidth="2xl">
          <>
            <Text variant="bodyBigRegular">
              <>{messages && <>{messages}</>}</>
            </Text>
          </>
        </Box>
        {button ? (
          <>{button}</>
        ) : (
          <Button
            variant={'secondary'}
            onClick={() => window.location.reload()}>
            <>{t('Common.ReloadSite')}</>
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
