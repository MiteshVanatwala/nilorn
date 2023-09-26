import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
// import { IDENTITY_CONFIG } from './authConst';
import { AuthProvider } from 'react-oidc-context';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundaries';
import SpinnerOverlay from './components/Spinner/SpinnerOverlay';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <Suspense>
          {/* <AuthProvider {...IDENTITY_CONFIG}> */}
          <App />
          {/* </AuthProvider> */}
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
