import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import MainApp from './MainApp';
import ProductDevelopmentPage from '../ProductDevelopmentPage/ProductDevelopmentPage';
import RouteError from '../../components/ErrorBoundary/RouteError';
import ClientsPage from '../Clients/ClientPage';
import SourcingsPage from '../Sourcings/SourcingsPage';
import PricesPage from '../Prices/PricesPage';
import SigninOidc from '../Auth/SigninOidc';

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
            path: 'product-development/:productNo',
            element: <ProductDevelopmentPage />,
          },
          {
            path: 'clients',
            element: <ClientsPage />,
          },
          {
            path: 'changelog',
            element: <SourcingsPage />,
          },
          {
            path: 'prices',
            element: <PricesPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
