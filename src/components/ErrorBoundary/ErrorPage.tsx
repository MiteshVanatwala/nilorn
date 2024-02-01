import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE, COLORS } from '../../theme/Constants';

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
              <Text
                as="i"
                color={'inherit'}
                className="ri-alert-line"
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
