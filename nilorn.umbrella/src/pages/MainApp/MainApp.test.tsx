import { render } from '@testing-library/react';
import MainApp from './MainApp';
import { AuthProvider } from 'react-oidc-context';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('chakra-react-select', () => ({
  useTranslation: () => {
    return {};
  },
}));

xtest('Set up provider mock', () => {
  const { getByText } = render(
    <AuthProvider>
      <QueryClientProvider client={new QueryClient()}>
        <MainApp />
      </QueryClientProvider>
    </AuthProvider>
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
});
