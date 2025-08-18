import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import MainApp from './MainApp';
import ProductDevelopmentPage from '../ProductDevelopmentPage/ProductDevelopmentPage';
import RouteError from '../../components/ErrorBoundary/RouteError';
import SourcingsPage from '../Sourcings/SourcingsPage';
import SigninOidc from '../Auth/SigninOidc';
import ProductionsPage from '../Productions/ProductionsPage';
import NotFoundPage from '../NotFound/NotFoundPage';
import PriceCalculationsPage from '../PriceCalculationsPage/PriceCalculationsPage';
import SignoutOidc from '../Auth/SignoutOidc';
import ProjectsPage from '../Projects/ProjectsPage';
import ClientsPage from '../Clients/ClientPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainApp />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { path: 'signin-oidc', element: <SigninOidc /> },
          { path: 'signout-oidc', element: <SignoutOidc /> },
          { element: <HomePage />, index: true },
          {
            path: 'product-development/:no',
            element: <ProductDevelopmentPage createNew={false} />,
          },
          {
            path: 'product-development/create',
            element: <ProductDevelopmentPage createNew={true} />,
          },
          {
            path: 'productions',
            element: <ProductionsPage />,
          },
          {
            path: 'changelog',
            element: <SourcingsPage />,
          },
          {
            path: 'price-calculations',
            element: <PriceCalculationsPage />,
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
          },
          {
            path: 'projects/:no',
            element: <ProjectsPage />,
          },
          {
            path: 'clients',
            element: <ClientsPage />,
          },
          {
            path: 'clients/:no',
            element: <ClientsPage />,
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export default router;
