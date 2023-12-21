import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import MainApp from './MainApp';
import ProductDevelopmentPage from '../ProductDevelopmentPage/ProductDevelopmentPage';
import RouteError from '../../components/ErrorBoundary/RouteError';
import SourcingsPage from '../Sourcings/SourcingsPage';
import PricesPage from '../Prices/PricesPage';
import SigninOidc from '../Auth/SigninOidc';
import ProductionsPage from '../Productions/ProductionsPage';
import NotFoundPage from '../NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainApp />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { path: 'signin-oidc', element: <SigninOidc /> },
          { element: <HomePage />, index: true },
          {
            path: 'product-development/:no',
            element: <ProductDevelopmentPage createNew={false} />,
          },
          {
            path: 'product-development/create',
            element: <ProductDevelopmentPage createNew />,
          },
          {
            path: 'production',
            element: <ProductionsPage />,
          },
          {
            path: 'changelog',
            element: <SourcingsPage />,
          },
          {
            path: 'prices',
            element: <PricesPage />,
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export default router;
