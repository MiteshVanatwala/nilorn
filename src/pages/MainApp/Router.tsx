import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import MainApp from './MainApp';
import ProductDevelopment from '../Product/ProductDevelopment';
import RouteError from '../../components/ErrorBoundary/RouteError';
import ClientsPage from '../Clients/ClientPage';
import SourcingsPage from '../Sourcings/SourcingsPage';
import ProjectsPage from '../Projects/ProjectsPage';
import PricesPage from '../Prices/PricesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainApp />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { element: <HomePage />, index: true },
          {
            path: 'product-development/:id',
            element: <ProductDevelopment />,
          },
          {
            path: 'clients',
            element: <ClientsPage />,
          },
          {
            path: 'sourcings',
            element: <SourcingsPage />,
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
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
