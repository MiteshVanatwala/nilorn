import { Box, Button, Text } from '@chakra-ui/react';
import ErrorBoundary from './ErrorBoundaries';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  boundaryName: string;
  shouldCrash: boolean;
  /**
   * Optional status code/label from the backend error.
   * Example: 500
   */
  errorStatus?: unknown;
  close: () => void;
  children: ReactNode;
};

const VariableCrash = () => {
  // Intentionally access a wrong property to trigger a render-time error.
  // ErrorBoundary will catch it.
  const bad: any = undefined;
  return <>{bad.deep.value}</>;
};

const BackendErrorBoundary = ({
  boundaryName,
  shouldCrash,
  errorStatus,
  close,
  children,
}: Props) => {
  const { t } = useTranslation();
  return (
    <ErrorBoundary
      boundaryName={boundaryName}
      fallback={
        <Box
          p={SPACE.MD}
          px={SPACE.SM}
          maxW={SIZES.CONTAINER.LG}
          display="flex"
          flexDirection="column"
          justifyContent="center">
          <Text color="red.600" mb={SPACE.SM}>
            <>
            {t('Common.ErrorTitle') ||
              'An unexpected error occurred while editing price calculations.'}
            {errorStatus && <>&nbsp;({errorStatus})</>}
            </>
          </Text>
        </Box>
      }>
      <>
        {shouldCrash ? <VariableCrash /> : null}
        {children}
      </>
    </ErrorBoundary>
  );
};

export default BackendErrorBoundary;

